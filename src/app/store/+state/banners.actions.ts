import { createActionGroup, emptyProps, props } from '@ngrx/store'
import {
    BannerEntity,
    BannerFindOneDto,
    BannerResponseDto,
    BannerSaveDto,
    BannersFindDto,
    BannerSingleResponse,
    deleteBannerResponse,
} from '../../models/banner'
import {
    FindReferenceDataDto,
    ReferenceDataResponseDto,
} from '../../models/reference-data'

export const BannersActions = createActionGroup({
    source: '[Banners/API]',
    events: {
        'Load Banners': props<{ body: BannersFindDto }>(),
        'Load Banners Success': props<{ banners: BannerResponseDto }>(),
        'Load Banners Failure': props<{ error: string }>(),

        'Load Single Banner': props<{ body: BannerFindOneDto }>(),
        'Load Single Banner Success': props<{ selectedBanner: BannerSingleResponse }>(),
        'Load Single Banner Failure': props<{ error: string }>(),

        'Save Banner': props<{ banner: BannerSaveDto; body: BannersFindDto }>(),
        'Save Banner Success': props<{ response: BannerEntity }>(),
        'Save Banner Failure': props<{ error: string }>(),

        'Delete Banner': props<{ id: string; body: BannersFindDto }>(),
        'Delete Banner Success': props<{ response: deleteBannerResponse }>(),
        'Delete Banner Failure': props<{ error: string }>(),

        'Clear Selected Banner': emptyProps,
    },
})

export const ReferenceDataActions = createActionGroup({
    source: '[Reference/API]',
    events: {
        'Load Reference Data': props<{ body: FindReferenceDataDto }>(),
        'Load Reference Data Success': props<{ data: ReferenceDataResponseDto }>(),
        'Load Reference Data Failure': props<{ error: string }>(),
    },
})
