import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor, HttpClient
} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {


    constructor() {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const accessToken = localStorage.getItem('accessToken');
        
        // handle case where the user is logged in, but trying to login again
        const urlRegex = /api\/login$/i;
        if(urlRegex.test(request.url)){
            return next.handle(request);
        }
        
        if (accessToken) {
            const authReq = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + accessToken)
            });
            return next.handle(authReq);
        } else {
            return next.handle(request);
        }
    }
}