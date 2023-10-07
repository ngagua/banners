import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { BannersActions } from './banners.actions'
import { BannersService } from '../../services/banners.service'

@Injectable()
export class BannersEffects {
    private actions$ = inject(Actions)
    private bannersService = inject(BannersService)
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
}
