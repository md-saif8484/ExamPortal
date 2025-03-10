import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private login:LoginService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.login.getToken();
        console.log("inside interceptor");
        let authReq = req;
        if(token!=null)
        {
            authReq = authReq.clone({
                setHeaders:{Authorization:`Bearer ${token}`}
            });
        }
        console.log("laving interceptor",authReq);
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    },
];