import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class DrawerService {
    private _showDrawer = false

    constructor() {}

    get getShowDrawer(): boolean {
        return this._showDrawer
    }

    set setShowDrawer(value: boolean) {
        this._showDrawer = value
    }
}
