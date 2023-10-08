import { TableHeaders } from '../../models/table'
import { BannersFindDto } from '../../models/banner'

export const tableHeaders: TableHeaders[] = [
    {
        id: 'filed',
        label: 'Filed',
    },
    { id: 'name', label: 'Name' },
    // { id: 'channelId', label: 'Channel ID' },
    // { id: 'id', label: 'ID' },
    { id: 'active', label: 'Active' },
    // { id: 'zoneId', label: 'Zone ID' },
    { id: 'startDate', label: 'Start Date' },
    { id: 'endDate', label: 'End Date' },
    { id: 'labels', label: 'Labels' },
]

export const bannerFields: BannersFindDto = {
    pageSize: 10,
    pageIndex: 1,
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
    ],
}
