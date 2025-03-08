import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

export const normalGuard: CanActivateFn = (route, state) => {
   const login = inject(LoginService);
    const router = inject(Router);
    console.log("inside normal guard");
    if(login.isLoggedIn() && login.getUserRole()=='Normal')
    {
      return true;
    }
    setTimeout(() => {
      router.navigate(['login']); // Redirect to login
    }, 0);
  
    return false;
};
