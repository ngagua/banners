import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { BASE_URL } from '../shared/utils/base-url'
import { FindReferenceDataDto, ReferenceDataItemDto } from '../models/reference-data'

@Injectable({
    providedIn: 'root',
})
export class ReferenceDataService {
    constructor(
        private http: HttpClient,
        @Inject(BASE_URL) private baseUrl: string
    ) {}

    getReferenceData(body: FindReferenceDataDto) {
        return this.http.post<ReferenceDataItemDto>(
            `${this.baseUrl}/reference-data/find`,
            body
        )
    }
}
