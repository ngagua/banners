import { Component, inject } from '@angular/core'
import { DrawerService } from '../../services/drawer.service'
import { Store } from '@ngrx/store'

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
    drawerService = inject(DrawerService)
    store = inject(Store)
}
