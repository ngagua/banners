import { Action, createReducer, on } from '@ngrx/store'
import { BannersActions, ReferenceDataActions } from './banners.actions'
import { BannerResponseDto, BannerSingleResponse } from '../../models/banner'
import { ReferenceDataItemDto } from '../../models/reference-data'

export const BANNERS_FEATURE_KEY = 'banners'

export interface BannersState {
    banners?: BannerResponseDto | undefined
    loaded: boolean
    error?: string | null
    selectedBanner?: BannerSingleResponse
    referenceData?: ReferenceDataItemDto[]
}

export interface BannersPartialState {
    readonly [BANNERS_FEATURE_KEY]: BannersState
}

export const initialBannersState: BannersState = {
    banners: undefined,
    selectedBanner: undefined,
    referenceData: undefined,
    loaded: true,
    error: null,
}

const reducer = createReducer(
    initialBannersState,
    on(
        BannersActions.loadBanners,
        BannersActions.loadSingleBanner,
        BannersActions.saveBanner,
        BannersActions.deleteBanner,
        ReferenceDataActions.loadReferenceData,
        (state) => ({
            ...state,
            loaded: false,
            error: null,
        })
    ),
    on(
        BannersActions.loadBannersFailure,
        BannersActions.loadSingleBannerFailure,
        BannersActions.saveBannerFailure,
        BannersActions.deleteBannerFailure,
        ReferenceDataActions.loadReferenceDataFailure,
        (state, { error }) => ({
            ...state,
            error,
            loaded: true,
        })
    ),
    on(BannersActions.loadBannersSuccess, (state, action) => ({
        ...state,
        banners: action.banners,
        loaded: true,
    })),
    on(BannersActions.saveBannerSuccess, (state, action) => ({
        ...state,
        loaded: true,
    })),
    on(BannersActions.loadSingleBannerSuccess, (state, action) => ({
        ...state,
        selectedBanner: action.selectedBanner,
        loaded: true,
    })),
    on(BannersActions.clearSelectedBanner, (state, action) => ({
        ...state,
        selectedBanner: undefined,
    })),
    on(ReferenceDataActions.loadReferenceDataSuccess, (state, action) => ({
        ...state,
        referenceData: action.data.data.entities,
        loaded: true,
    }))
)

export function bannersReducer(state: BannersState | undefined, action: Action) {
    return reducer(state, action)
}
