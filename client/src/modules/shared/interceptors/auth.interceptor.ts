import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  /**
   * Custom Interceptor which intercepts request to add authorization header
   * Note:- To skip the request to add the header, make use of HTTP Backend
   * @param request 
   * @param next 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.authService.isLoggedIn()){
      const tokenizedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      return next.handle(tokenizedRequest);
    }
    return next.handle(request.clone())

  }
}