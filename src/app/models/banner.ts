export interface BannersFindDto {
    includes?: string[]
    excludes?: string[]
    search?: string
    ids?: string[]
    excludeIds?: string[]
    targetAudienceIds?: string[]
    query?: {}
    sortBy?: string
    sortDirection?: 'asc' | 'desc'
    pageIndex?: number
    pageSize?: number
    searchAfter?: string[]
}

export interface BannerFindOneDto {
    id: string
    includes?: string[]
    excludes?: string[]
}

export interface BannerEntity {
    id: string
    name: string
    isCorporate: true
    channelId: string
    fileId: string
    language: string
    zoneId: string
    startDate: string
    endDate: string
    modifiedAt: string
    createdAt: string
    url: string
    active: boolean
    priority: number
}

export interface BannerResponseDto {
    data: {
        total: number
        entities: BannerEntity[]
    }
}

export interface BannerSingleResponse {
    data: BannerEntity
    success: boolean
}

export interface deleteBannerResponse {
    success: boolean
}

export interface BannerSaveDto {
    id: string
    name: string
    isCorporate: boolean
    channelId: string
    fileId: string
    language: string
    zoneId: string
    startDate: string
    endDate: string
    url: string
    active: boolean
    priority: number
    labels: string[]
}
