import { Component, inject, OnInit } from '@angular/core'
import { BannersService } from '../../services/banners.service'
import { BannersFindDto } from '../../models/banner'

@Component({
    selector: 'app-banner-table',
    templateUrl: './banner-table.component.html',
    styleUrls: ['./banner-table.component.scss'],
})
export class BannerTableComponent implements OnInit {
    bannerService = inject(BannersService)

    ngOnInit(): void {
        const banners: BannersFindDto = {
            search: 'name',
            pageSize: 10,
            pageIndex: 1,
            includes: ['name', 'channelId', 'id'],
        }
        this.bannerService.findBanners(banners).subscribe()
    }
}
