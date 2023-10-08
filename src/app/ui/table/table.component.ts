import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort, Sort } from '@angular/material/sort'
import { LiveAnnouncer } from '@angular/cdk/a11y'
import { ActionsPayload, TableHeaders } from '../../models/table'
import { Actions } from '../../models/enum'
import { BannerEntity } from '../../models/banner'

@Component({
    selector: 'banner-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent {
    @Input({ required: true }) columnDefinition: TableHeaders[] = []
    @Input({ required: true }) tableData: BannerEntity[] | undefined

    @Output() readonly actionCalled = new EventEmitter<ActionsPayload>()

    dataSource: MatTableDataSource<BannerEntity>
    mappedTableData: string[] = []
    clickedRowID = 0
    actions = Actions

    constructor(private _liveAnnouncer: LiveAnnouncer) {
        this.dataSource = new MatTableDataSource([]) as any
    }

    @ViewChild(MatSort) set matSort(sort: MatSort) {
        this.dataSource.sort = sort
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
