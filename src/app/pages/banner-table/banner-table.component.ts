import { Component, inject, OnInit } from '@angular/core'
import { ActionsPayload } from '../../models/table'
import { BannersActions } from '../../store/+state/banners.actions'
import { Store } from '@ngrx/store'
import {
    selectBannersForTable,
    selectSingleBanner,
} from '../../store/+state/banners.selectors'
import { Actions } from '../../models/enum'
import { bannerFields, tableHeaders } from '../../shared/utils/constants'

@Component({
    selector: 'app-banner-table',
    templateUrl: './banner-table.component.html',
    styleUrls: ['./banner-table.component.scss'],
})
export class BannerTableComponent implements OnInit {
    store = inject(Store)

    tableHeaders = tableHeaders
    bannerFields = bannerFields

    banners$ = this.store.select(selectBannersForTable)
    selectedBanner$ = this.store.select(selectSingleBanner)

    ngOnInit(): void {
        this.store.dispatch(BannersActions.loadBanners({ body: this.bannerFields }))
    }

    handleTableAction(payload: ActionsPayload) {
        console.log('payload', payload.action)
        if (payload.action === Actions.DELETE) {
            this.store.dispatch(
                BannersActions.deleteBanner({
                    id: payload.banner.id,
                    body: this.bannerFields,
                })
            )
        }
        if (payload.action === Actions.EDIT) {
            this.store.dispatch(
                BannersActions.loadSingleBanner({
                    body: { includes: this.bannerFields.includes, id: payload.banner.id },
                })
            )
        }
    }
}
