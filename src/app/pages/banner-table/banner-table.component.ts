import { Component, inject, OnInit } from '@angular/core'
import { BannersService } from '../../services/banners.service'
import { BannersFindDto } from '../../models/banner'
import { ActionsPayload, TableHeaders } from '../../models/table'
import { BannersActions } from '../../store/+state/banners.actions'
import { Store } from '@ngrx/store'
import { selectBannersForTable } from '../../store/+state/banners.selectors'
import { Actions } from '../../models/enum'

@Component({
    selector: 'app-banner-table',
    templateUrl: './banner-table.component.html',
    styleUrls: ['./banner-table.component.scss'],
})
export class BannerTableComponent implements OnInit {
    store = inject(Store)
    bannerService = inject(BannersService)
    tableHeaders: TableHeaders[] = [
        {
            id: 'filed',
            label: 'Filed',
        },
        { id: 'name', label: 'Name' },
        { id: 'channelId', label: 'Channel ID' },
        { id: 'id', label: 'ID' },
        { id: 'active', label: 'Active' },
        { id: 'zoneId', label: 'Zone ID' },
        { id: 'startDate', label: 'Start Date' },
        { id: 'endDate', label: 'End Date' },
        { id: 'labels', label: 'Labels' },
    ]
    banners$ = this.store.select(selectBannersForTable)
    bannerFields: BannersFindDto = {
        pageSize: 10,
        pageIndex: 1,
        includes: [
            'filed',
            'name',
            'channelId',
            'id',
            'active',
            'zoneId',
            'startDate',
            'endDate',
            'labels',
        ],
    }

    ngOnInit(): void {
        this.store.dispatch(BannersActions.loadBanners({ body: this.bannerFields }))
    }

    handleTableAction(payload: ActionsPayload) {
        if ((payload.action = Actions.DELETE)) {
            console.log(payload.banner.id)
            this.store.dispatch(
                BannersActions.deleteBanner({
                    id: payload.banner.id,
                    body: this.bannerFields,
                })
            )
        }
    }
}
