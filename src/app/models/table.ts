import { BannerEntity } from './banner'
import { Actions } from './enum'

export interface TableHeaders {
    id: string
    label: string
}

export interface ActionsPayload {
    banner: BannerEntity
    action: Actions
    pagination?: { pageIndex: number; size: number }
}

export interface PaginationModel {
    length?: number
    pageIndex: number
    pageSize: number
    previousPageIndex?: number
}
