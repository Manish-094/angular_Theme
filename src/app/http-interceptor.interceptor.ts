import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokan=localStorage.getItem('token')
    
    if(tokan!==null && tokan!== undefined){
     request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + tokan) });
    }
    if(Headers === null || Headers === undefined){
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }
    return next.handle(request);
  }
}
