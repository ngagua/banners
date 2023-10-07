import { Action, createReducer, on } from '@ngrx/store'
import { BannersActions } from './banners.actions'
import { BannerResponseDto } from '../../models/banner'

export const BANNERS_FEATURE_KEY = 'banners'

export interface BannersState {
    banners: BannerResponseDto | undefined
    loaded: boolean
    error?: string | null
}

export interface BannersPartialState {
    readonly [BANNERS_FEATURE_KEY]: BannersState
}

export const initialBannersState: BannersState = {
    banners: undefined,
    loaded: true,
    error: null,
}

const reducer = createReducer(
    initialBannersState,
    on(BannersActions.loadBanners, (state) => ({
        ...state,
        loaded: false,
        error: null,
    })),
    on(BannersActions.loadBannersSuccess, (state, action) => ({
        ...state,
        banners: action.banners,
        loaded: true,
    })),
    on(BannersActions.loadBannersFailure, (state, { error }) => ({
        ...state,
        error,
        loaded: true,
    }))
)

export function bannersReducer(state: BannersState | undefined, action: Action) {
    return reducer(state, action)
}
