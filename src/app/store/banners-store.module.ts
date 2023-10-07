import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as fromBanners from './+state/banners.reducer'
import { BannersEffects } from './+state/banners.effects'

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(
            fromBanners.BANNERS_FEATURE_KEY,
            fromBanners.bannersReducer
        ),
        EffectsModule.forFeature([BannersEffects]),
    ],
})
export class BannersStoreModule {}
