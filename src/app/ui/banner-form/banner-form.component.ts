import { Component, inject, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { FormBuilder } from '@angular/forms'
import { selectSingleBanner } from '../../store/+state/banners.selectors'

@Component({
    selector: 'banner-form',
    templateUrl: './banner-form.component.html',
    styleUrls: ['./banner-form.component.scss'],
})
export class BannerFormComponent implements OnInit {
    store = inject(Store)
    fb = inject(FormBuilder)

    banner$ = this.store.select(selectSingleBanner)

    ngOnInit(): void {}
}
