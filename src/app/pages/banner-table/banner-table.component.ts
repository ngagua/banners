import { Component, inject, OnInit } from '@angular/core'
import { ActionsPayload, PaginationModel } from '../../models/table'
import { BannersActions, ReferenceDataActions } from '../../store/+state/banners.actions'
import { Store } from '@ngrx/store'
import { selectBannersForTable } from '../../store/+state/banners.selectors'
import { Actions } from '../../models/enum'
import {
    bannerFields,
    ReferenceDataBody,
    tableHeaders,
} from '../../shared/utils/constants'
import { DrawerService } from '../../services/drawer.service'

@Component({
    selector: 'app-banner-table',
    templateUrl: './banner-table.component.html',
    styleUrls: ['./banner-table.component.scss'],
})
export class BannerTableComponent implements OnInit {
    store = inject(Store)
    drawerService = inject(DrawerService)

    tableHeaders = tableHeaders
    bannerFields = bannerFields
    referenceDataBody = ReferenceDataBody

    searchValue = ''

    banners$ = this.store.select(selectBannersForTable)

    ngOnInit(): void {
        this.store.dispatch(BannersActions.loadBanners({ body: this.bannerFields }))
        this.store.dispatch(
            ReferenceDataActions.loadReferenceData({ body: this.referenceDataBody })
        )
    }

    handleTableAction(payload: ActionsPayload) {
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
            this.drawerService.setShowDrawer = true
        }
    }

    handleSearch(value: string) {
        this.searchValue = value
        this.store.dispatch(
            BannersActions.loadBanners({
                body: {
                    ...this.bannerFields,
                    search: value,
                },
            })
        )
    }

    handlePagination(paginator: PaginationModel) {
        this.store.dispatch(
            BannersActions.loadBanners({
                body: {
                    ...this.bannerFields,
                    pageIndex: paginator.pageIndex,
                    pageSize: paginator.pageSize,
                    search: this.searchValue,
                },
            })
        )
    }

    createBanner() {
        this.store.dispatch(BannersActions.clearSelectedBanner())
        this.drawerService.setShowDrawer = true
    }
}
