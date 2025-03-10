import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

export const normalGuard: CanActivateFn = (route, state) => {
   const login = inject(LoginService);
    const router = inject(Router);
    console.log("inside normal guard");
    console.log("token :- ",login.getToken());
    console.log("Is Logged In:", login.isLoggedIn());
  console.log("User Role:", login.getUserRole());
  return new Promise((resolve) => {
    setTimeout(() => {  // Ensure localStorage updates are applied
       if (login.isLoggedIn() && login.getUserRole() === 'Normal') {
          console.log("Guard: User is logged in as Normal");
          resolve(true);
       } else {
          console.log("Guard: Redirecting to login page");
          router.navigate(['login']);
          resolve(false);
       }
    }, 200);  // Short delay to wait for localStorage updates
 });
    // setTimeout(() => {
    //   router.navigate(['login']); // Redirect to login
    // }, 0);
    
    // console.warn("User not logged in or incorrect role, redirecting...");
    // router.navigate(['login']);
    // return false;
};
