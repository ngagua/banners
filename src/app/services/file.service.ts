import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { BASE_URL } from '../shared/utils/base-url'
import { FileResponse } from '../models/file'

@Injectable({
    providedIn: 'root',
})
export class FileService {
    constructor(
        private http: HttpClient,
        @Inject(BASE_URL) private baseUrl: string
    ) {}

    uploadFile(body: Blob) {
        const formData = new FormData()
        formData.set('blob', body)

        return this.http.post<FileResponse>(`${this.baseUrl}/blob/upload`, formData)
    }

    downloadFile(id: string) {
        return this.http.get(`${this.baseUrl}/blob/${id}`, { responseType: 'blob' })
    }
}
