import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LandingPageComponent } from './pages/landing-page/landing-page.component'
import { BannerTableComponent } from './pages/banner-table/banner-table.component'

const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'banners',
                pathMatch: 'full',
            },
            { path: 'banners', component: BannerTableComponent },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
