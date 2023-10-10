import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import {
    selectDownloadedFile,
    selectFile,
    selectReferenceData,
    selectSingleBanner,
} from '../../store/+state/banners.selectors'
import { Subject, takeUntil } from 'rxjs'
import { DrawerService } from '../../services/drawer.service'
import { ReferenceDataItemDto } from '../../models/reference-data'
import { BannersActions, FileActions } from '../../store/+state/banners.actions'
import { BannerSaveDto } from '../../models/banner'
import { bannerFields } from 'src/app/shared/utils/constants'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
    selector: 'banner-form',
    templateUrl: './banner-form.component.html',
    styleUrls: ['./banner-form.component.scss'],
})
export class BannerFormComponent implements OnInit, OnDestroy {
    store = inject(Store)
    fb = inject(FormBuilder)
    drawerService = inject(DrawerService)
    sanitizer = inject(DomSanitizer)

    referenceData$ = this.store.select(selectReferenceData)
    banner$ = this.store.select(selectSingleBanner)
    file$ = this.store.select(selectFile)
    downloadedFile$ = this.store.select(selectDownloadedFile)
    endSubs$ = new Subject<void>()

    bannerFields = bannerFields

    form: FormGroup
    imageControl = new FormControl<any | null>(null)

    zoneOptions: ReferenceDataItemDto[] = []
    labelOptions: ReferenceDataItemDto[] = []
    channelOptions: ReferenceDataItemDto[] = []
    languageOptions: ReferenceDataItemDto[] = []

    constructor() {
        this.form = this.fb.group({
            id: [''],
            name: [''],
            zoneId: [''],
            active: [false],
            startDate: [''],
            endDate: [''],
            channelId: [''],
            labels: [''],
            fileId: ['', Validators.required],
            url: [''],
            language: [''],
            priority: [''],
        })
    }

    ngOnInit(): void {
        this.banner$.pipe(takeUntil(this.endSubs$)).subscribe((banner) => {
            if (banner) {
                // this.store.dispatch(FileActions.downloadFile({ id: banner.data.fileId }))
                this.downloadedFile$.pipe(takeUntil(this.endSubs$)).subscribe((file) => {
                    if (file) {
                        const imageUrl = this.sanitizer.bypassSecurityTrustUrl(
                            URL.createObjectURL(file)
                        )
                        this.imageControl.patchValue(imageUrl)
                    }
                })

                this.form.patchValue(banner.data)
            } else {
                this.imageControl.reset()
                this.form.reset()
                this.form.get('active')?.patchValue(false)
            }
        })
        this.referenceData$.pipe(takeUntil(this.endSubs$)).subscribe((data) => {
            if (data) {
                this.channelOptions = data.filter((item) => item.typeId === '1600')
                this.zoneOptions = data.filter((item) => item.typeId === '1700')
                this.labelOptions = data.filter((item) => item.typeId === '1900')
                this.languageOptions = data.filter((item) => item.typeId === '2900')
            }
        })
        this.file$.pipe(takeUntil(this.endSubs$)).subscribe((file) => {
            if (file) {
                this.form.patchValue({ fileId: file.id })
            }
        })
    }

    today() {
        const date = new Date()
        date.setDate(date.getDate())

        return date
    }

    save() {
        const banner = {
            ...this.form.value,
        } as BannerSaveDto

        this.store.dispatch(
            BannersActions.saveBanner({ banner, body: this.bannerFields })
        )

        this.cancel()
        this.form.reset()
        this.imageControl.reset()
    }

    cancel() {
        this.drawerService.setShowDrawer = false
        this.store.dispatch(BannersActions.clearSelectedBanner())
    }

    onFileSelected(event: Event) {
        const inputElement = event.target as HTMLInputElement
        if (inputElement.files && inputElement.files.length > 0) {
            const file = inputElement.files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                if (!(e.target && e.target?.result)) return
                const blob = new Blob([e.target.result], { type: file.type })
                const imageUrl = this.sanitizer.bypassSecurityTrustUrl(
                    URL.createObjectURL(blob)
                )

                this.imageControl.patchValue(imageUrl)
                this.store.dispatch(FileActions.uploadFile({ body: blob }))
            }
            reader.readAsArrayBuffer(file)
        }
    }

    ngOnDestroy() {
        this.endSubs$.next()
        this.endSubs$.complete()
    }
}
