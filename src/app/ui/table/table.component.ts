import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    ViewChild,
} from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort, Sort } from '@angular/material/sort'
import { LiveAnnouncer } from '@angular/cdk/a11y'
import { ActionsPayload, PaginationModel, TableHeaders } from '../../models/table'
import { Actions } from '../../models/enum'
import { BannerEntity } from '../../models/banner'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'banner-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
    @Input({ required: true }) columnDefinition: TableHeaders[] = []
    @Input({ required: true }) tableData: BannerEntity[] | undefined
    @Input() length = 0

    @Output() readonly actionCalled = new EventEmitter<ActionsPayload>()
    @Output() readonly paginationCalled = new EventEmitter<PaginationModel>()

    dataSource: MatTableDataSource<BannerEntity>
    mappedTableData: string[] = []
    clickedRowID = 0
    actions = Actions

    pageSize = 10
    pageIndex = 0
    pageSizeOptions = [5, 10, 25, 50]

    constructor(private _liveAnnouncer: LiveAnnouncer) {
        this.dataSource = new MatTableDataSource([]) as any
    }

    @ViewChild(MatSort) set matSort(sort: MatSort) {
        this.dataSource.sort = sort
    }

    handlePageEvent(e: PageEvent) {
        this.length = e.length
        this.pageSize = e.pageSize
        this.pageIndex = e.pageIndex
        this.paginationCalled.emit(e)
    }

    ngOnChanges() {
        if (!this.columnDefinition.some((col) => col.id === 'CRUD_OPERATION'))
            this.columnDefinition.push({
                id: 'CRUD_OPERATION',
                label: 'Actions',
            })
        this.dataSource.data = this.tableData || []
        this.mappedTableData = this.columnDefinition.map((column) => column.id)
    }

    announceSortChange(sortData: Sort) {
        if (sortData.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortData.direction}ending`)
        } else {
            this._liveAnnouncer.announce('Sorting cleared')
        }
    }

    select(element: any) {
        this.clickedRowID = element.id
    }

    performAction(action: Actions, banner: BannerEntity) {
        this.actionCalled.emit({ action, banner })
    }
}
