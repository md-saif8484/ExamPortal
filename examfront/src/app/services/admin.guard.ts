import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  const router = inject(Router);
  console.log("inside admin guard");
  if(login.isLoggedIn() && login.getUserRole()=='Admin')
  {
    return true;
  }
  setTimeout(() => {
    router.navigate(['login']); // Redirect to login
  }, 0);

  return false;
};
