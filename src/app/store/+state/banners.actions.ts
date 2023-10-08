import { createActionGroup, props } from '@ngrx/store'
import {
    BannerEntity,
    BannerFindOneDto,
    BannerResponseDto,
    BannerSaveDto,
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

        'Load Single Banner': props<{ body: BannerFindOneDto }>(),
        'Load Single Banner Success': props<{ selectedBanner: BannerSingleResponse }>(),
        'Load Single Banner Failure': props<{ error: string }>(),

        'Save Banner': props<{ body: BannerSaveDto }>(),
        'Save Banner Success': props<{ response: BannerEntity }>(),
        'Save Banner Failure': props<{ error: string }>(),

        'Delete Banner': props<{ id: string; body: BannersFindDto }>(),
        'Delete Banner Success': props<{ response: deleteBannerResponse }>(),
        'Delete Banner Failure': props<{ error: string }>(),
    },
})
