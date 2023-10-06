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

export interface BannerDto {
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
