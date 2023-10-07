import { createActionGroup, props } from '@ngrx/store'
import {
    BannerResponseDto,
    BannersFindDto,
    BannerSingleResponse,
    deleteBannerResponse,
} from '../../models/banner'

export const BannersActions = createActionGroup({
    source: '[Banners/API]',
    events: {
        'Load Banners': props<{ body: BannersFindDto }>(),
        'Load Banners Success': props<{ banners: BannerResponseDto }>(),
        'Load Banners Failure': props<{ error: string }>(),

        'Load Single Banner': props<{ body: BannersFindDto }>(),
        'Load Single Banner Success': props<{ selectedBanner: BannerSingleResponse }>(),
        'Load Single Banner Failure': props<{ error: string }>(),

        'Delete Banner': props<{ id: string; body: BannersFindDto }>(),
        'Delete Banner Success': props<{ response: deleteBannerResponse }>(),
        'Delete Banner Failure': props<{ error: string }>(),
    },
})
