// Create an HTTP interceptor
import { Injectable } from '@angular/core'
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token =
            'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImludGVybnNoaXBAb3B0aW8uYWkiLCJzdWIiOiJpbnRlcm5zaGlwIiwiaW50ZXJuc2hpcElkIjoiY2hhZHVuZWxpa2FraGFAZ21haWwuY29tIiwiaWF0IjoxNjk2NTI4NDE3LCJleHAiOjE2OTczOTI0MTd9.MOO4tQHqcD7FTcf4VvQ5_9jEfn-HzeNtGppoU88fzZ2YqGPl8OBk2Em6x_XvyR5N79EsobAygZ00hGUxIuIzfg'

        const clonedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        })
        return next.handle(clonedRequest)
    }
}
