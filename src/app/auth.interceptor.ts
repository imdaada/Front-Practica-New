import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {BaseURLService} from "./base-url.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private router: Router, private baseURLService :BaseURLService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url !== (this.baseURLService.getURL() + 'authenticate')) {
      if (request.url !== (this.baseURLService + 'register')) {
        const newReqest = request.clone({headers: request.headers.set('Authorization', this.cookieService.get('token'))});
        console.log(newReqest);
        return next.handle(newReqest).pipe(tap(
          (err) => {
          },
          (err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                console.log('Unauthorized');
                if (request.url !== (this.baseURLService.getURL() + 'role')) {
                  alert('Вы не авторизованы!');
                  this.router.navigateByUrl('/login');
                }
              }
            }
          }));
      }
    }
    return next.handle(request);
  }
}
