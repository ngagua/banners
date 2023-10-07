import { createActionGroup, props } from '@ngrx/store'
import { BannerResponseDto, BannersFindDto } from '../../models/banner'

export const BannersActions = createActionGroup({
    source: '[Banners/API]',
    events: {
        'Load Banners': props<{ body: BannersFindDto }>(),
        'Load Banners Success': props<{ banners: BannerResponseDto }>(),
        'Load Banners Failure': props<{ error: string }>(),
    },
})
