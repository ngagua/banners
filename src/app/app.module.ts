import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthInterceptor } from './interceptors/authInterceptor.interceptor'
import { BASE_URL } from './shared/utils/base-url'
import { environment } from '../environments/environment'
import { BannerTableComponent } from './pages/banner-table/banner-table.component'
import { LandingPageComponent } from './pages/landing-page/landing-page.component'
import { TableComponent } from './ui/table/table.component'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSortModule } from '@angular/material/sort'
import { StoreModule } from '@ngrx/store'
import { BannersStoreModule } from './store/banners-store.module'
import { EffectsModule } from '@ngrx/effects'
import { MatSidenavModule } from '@angular/material/sidenav'
import { SearchComponent } from './ui/search/search.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { BannerFormComponent } from './ui/banner-form/banner-form.component'

@NgModule({
    declarations: [
        AppComponent,
        BannerTableComponent,
        LandingPageComponent,
        TableComponent,
        SearchComponent,
        BannerFormComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        BannersStoreModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        MatSidenavModule,
    ],
    providers: [
        {
            provide: BASE_URL,
            useValue: environment.apiBaseUrl,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
