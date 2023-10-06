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
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { TableComponent } from './ui/table/table.component'

@NgModule({
    declarations: [AppComponent, BannerTableComponent, LandingPageComponent, TableComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule],
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
