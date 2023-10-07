import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { BASE_URL } from '../shared/utils/base-url'
import { BannerResponseDto, BannersFindDto } from '../models/banner'

@Injectable({
    providedIn: 'root',
})
export class BannersService {
    constructor(
        private http: HttpClient,
        @Inject(BASE_URL) private baseUrl: string
    ) {}

    getBanners(body: BannersFindDto) {
        console.log(`${this.baseUrl}/banners/find`)
        return this.http.post<BannerResponseDto>(`${this.baseUrl}/banners/find`, body)
    }
}
