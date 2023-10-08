export interface FindReferenceDataDto {
    typeId?: string
    subTypeId?: string
    parentId?: string
    path?: string
    typeIds?: string[]
    excludeKeys?: Include[]
    keys?: []
    autocomplete?: boolean
    includes?: Include[]
    excludes?: string[]
    search?: string
    ids?: string[]
    excludeIds?: string[]
    targetAudienceIds?: string[]
    query?: {}
    sortBy?: SortBy
    sortDirection?: SortDirection
    pageIndex?: number
    pageSize?: number
    searchAfter?: string[]
}

export interface ReferenceDataItemDto {
    parentId: string
    path: string
    pathNames: string
    childrenCount: number
    typeId: string
    subTypeId: string
    key: string
    formatId: string
    sortIndex: number
    name: string
    description: string
    attributes: {
        description: string
    }
    system: boolean
    createdAt: string
    modifiedAt: string
    id: string
}

type SortBy =
    | 'id'
    | 'typeId'
    | 'subTypeId'
    | 'parentId'
    | 'path.raw'
    | 'sortIndex'
    | 'formatId'
    | 'key'
    | 'name.raw'
    | 'description.raw'
    | 'system'
    | 'createdAt'
    | 'modifiedAt'

type SortDirection = 'asc' | 'desc' | ''

type Include =
    | 'id'
    | 'typeId'
    | 'subTypeId'
    | 'parentId'
    | 'path'
    | 'pathNames'
    | 'sortIndex'
    | 'formatId'
    | 'key'
    | 'name'
    | 'description'
    | 'attributes'
    | 'system'
    | 'createdAt'
    | 'modifiedAt'
    | 'childrenCount'
