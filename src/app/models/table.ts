import { BannerDto } from './banner'
import { Actions } from './enum'

export interface TableHeaders {
    id: string
    label: string
}

export interface ActionsPayload {
    banner: BannerDto
    action: Actions
    pagination?: { pageIndex: number; size: number }
}
