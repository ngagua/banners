import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { FormBuilder, FormGroup } from '@angular/forms'
import {
    selectReferenceData,
    selectSingleBanner,
} from '../../store/+state/banners.selectors'
import { Subject, takeUntil } from 'rxjs'
import { DrawerService } from '../../services/drawer.service'
import { ReferenceDataItemDto } from '../../models/reference-data'
import { BannersActions } from '../../store/+state/banners.actions'
import { BannerSaveDto } from '../../models/banner'
import { bannerFields } from 'src/app/shared/utils/constants'

@Component({
    selector: 'banner-form',
    templateUrl: './banner-form.component.html',
    styleUrls: ['./banner-form.component.scss'],
})
export class BannerFormComponent implements OnInit, OnDestroy {
    store = inject(Store)
    fb = inject(FormBuilder)
    drawerService = inject(DrawerService)

    referenceData$ = this.store.select(selectReferenceData)
    banner$ = this.store.select(selectSingleBanner)
    endSubs$ = new Subject<void>()

    bannerFields = bannerFields

    form: FormGroup
    zoneOptions: ReferenceDataItemDto[] = []
    labelOptions: ReferenceDataItemDto[] = []
    channelOptions: ReferenceDataItemDto[] = []
    languageOptions: ReferenceDataItemDto[] = []
    id = ''

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
            fileId: [''],
            url: [''],
            language: [''],
            priority: [''],
        })
    }

    ngOnInit(): void {
        this.banner$.pipe(takeUntil(this.endSubs$)).subscribe((banner) => {
            console.log('banner', banner)
            if (banner) {
                this.id = banner.data.id
                this.form.patchValue(banner.data)
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
    }

    cancel() {
        this.drawerService.setShowDrawer = false
        this.store.dispatch(BannersActions.clearSelectedBanner())
    }

    ngOnDestroy() {
        this.endSubs$.next()
        this.endSubs$.complete()
    }
}
