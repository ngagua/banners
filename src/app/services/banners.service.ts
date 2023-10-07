import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { BASE_URL } from '../shared/utils/base-url'
import {
    BannerResponseDto,
    BannersFindDto,
    BannerSingleResponse,
    deleteBannerResponse,
} from '../models/banner'

@Injectable({
    providedIn: 'root',
})
export class BannersService {
    constructor(
        private http: HttpClient,
        @Inject(BASE_URL) private baseUrl: string
    ) {}

    getBanners(body: BannersFindDto) {
        return this.http.post<BannerResponseDto>(`${this.baseUrl}/banners/find`, body)
    }

    getSingleBanner(body: BannersFindDto) {
        return this.http.post<BannerSingleResponse>(
            `${this.baseUrl}/banners/find-one`,
            body
        )
    }

    removeBanner(id: string) {
        return this.http.post<deleteBannerResponse>(`${this.baseUrl}/banners/remove`, {
            id,
        })
    }
}
