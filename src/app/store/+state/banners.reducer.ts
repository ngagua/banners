import { Action, createReducer, on } from '@ngrx/store'
import { BannersActions } from './banners.actions'
import { BannerResponseDto, BannerSingleResponse } from '../../models/banner'

export const BANNERS_FEATURE_KEY = 'banners'

export interface BannersState {
    banners?: BannerResponseDto | undefined
    loaded: boolean
    error?: string | null
    selectedBanner?: BannerSingleResponse
}

export interface BannersPartialState {
    readonly [BANNERS_FEATURE_KEY]: BannersState
}

export const initialBannersState: BannersState = {
    banners: undefined,
    selectedBanner: undefined,
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
    }))
)

export function bannersReducer(state: BannersState | undefined, action: Action) {
    return reducer(state, action)
}
