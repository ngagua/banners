import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BANNERS_FEATURE_KEY, BannersState } from './banners.reducer'

export const selectBannersState = createFeatureSelector<BannersState>(BANNERS_FEATURE_KEY)

export const selectBannersForTable = createSelector(
    selectBannersState,
    (state: BannersState) => state.banners
)

export const selectSingleBanner = createSelector(
    selectBannersState,
    (state: BannersState) => state.selectedBanner
)

export const selectReferenceData = createSelector(
    selectBannersState,
    (state: BannersState) => state.referenceData
)
export const selectBannersError = createSelector(
    selectBannersState,
    (state: BannersState) => state.error
)

export const selectLoaded = createSelector(
    selectBannersState,
    (state: BannersState) => state.loaded
)
