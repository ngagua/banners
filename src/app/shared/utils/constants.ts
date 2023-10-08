import { TableHeaders } from '../../models/table'
import { BannersFindDto } from '../../models/banner'
import { FindReferenceDataDto } from '../../models/reference-data'

export const tableHeaders: TableHeaders[] = [
    {
        id: 'fileId',
        label: 'Filed',
    },
    { id: 'name', label: 'Name' },
    { id: 'active', label: 'Active' },
    { id: 'startDate', label: 'Start Date' },
    { id: 'endDate', label: 'End Date' },
    { id: 'labels', label: 'Labels' },
]

export const bannerFields: BannersFindDto = {
    pageSize: 10,
    pageIndex: 0,
    includes: [
        'filed',
        'name',
        'channelId',
        'id',
        'active',
        'zoneId',
        'startDate',
        'endDate',
        'labels',
        'fileId',
        'url',
        'language',
        'priority',
    ],
}

export const ReferenceDataBody: FindReferenceDataDto = {
    typeIds: ['1600', '1700', '1900', '2900'],
    includes: ['id', 'name', 'typeId', 'key'],
    pageSize: 100,
    pageIndex: 0,
}
