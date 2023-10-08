import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { BannersActions, FileActions, ReferenceDataActions } from './banners.actions'
import { BannersService } from '../../services/banners.service'
import { ReferenceDataService } from '../../services/refference-data.service'
import { FileService } from '../../services/file.service'

@Injectable()
export class BannersEffects {
    referenceDataService = inject(ReferenceDataService)
    bannersService = inject(BannersService)
    fileService = inject(FileService)
    private actions$ = inject(Actions)

    loadReferenceData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReferenceDataActions.loadReferenceData),
            switchMap(({ body }) => {
                return this.referenceDataService
                    .getReferenceData(body)
                    .pipe(
                        map((data) =>
                            ReferenceDataActions.loadReferenceDataSuccess({ data })
                        )
                    )
            }),
            catchError((error) => {
                console.error('Error', error)
                return of(ReferenceDataActions.loadReferenceDataFailure({ error }))
            })
        )
    )

    loadBanners$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BannersActions.loadBanners),
            switchMap(({ body }) => {
                return this.bannersService
                    .getBanners(body)
                    .pipe(
                        map((banners) => BannersActions.loadBannersSuccess({ banners }))
                    )
            }),
            catchError((error) => {
                console.error('Error', error)
                return of(BannersActions.loadBannersFailure({ error }))
            })
        )
    )
    loadSingleBanner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BannersActions.loadSingleBanner),
            switchMap(({ body }) => {
                return this.bannersService
                    .getSingleBanner(body)
                    .pipe(
                        map((selectedBanner) =>
                            BannersActions.loadSingleBannerSuccess({ selectedBanner })
                        )
                    )
            }),
            catchError((error) => {
                console.error('Error', error)
                return of(BannersActions.loadSingleBannerFailure({ error }))
            })
        )
    )
    saveBanner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BannersActions.saveBanner),
            switchMap(({ banner, body }) => {
                return this.bannersService
                    .saveBanner(banner)
                    .pipe(map((response) => BannersActions.loadBanners({ body })))
            }),
            catchError((error) => {
                console.error('Error', error)
                return of(BannersActions.deleteBannerFailure({ error }))
            })
        )
    )
    deleteBanner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BannersActions.deleteBanner),
            switchMap(({ id, body }) => {
                return this.bannersService
                    .removeBanner(id)
                    .pipe(map((response) => BannersActions.loadBanners({ body })))
            }),
            catchError((error) => {
                console.error('Error', error)
                return of(BannersActions.deleteBannerFailure({ error }))
            })
        )
    )

    uploadFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FileActions.downloadFile),
            switchMap(({ id }) => {
                return this.fileService
                    .downloadFile(id)
                    .pipe(map((file) => FileActions.downloadFileSuccess({ file })))
            }),
            catchError((error) => {
                console.error('Error', error)
                return of(FileActions.uploadFileFailure({ error }))
            })
        )
    )

    downloadFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FileActions.uploadFile),
            switchMap(({ body }) => {
                return this.fileService
                    .uploadFile(body)
                    .pipe(map((data) => FileActions.uploadFileSuccess({ data })))
            }),
            catchError((error) => {
                console.error('Error', error)
                return of(FileActions.downloadFileFailure({ error }))
            })
        )
    )
}
