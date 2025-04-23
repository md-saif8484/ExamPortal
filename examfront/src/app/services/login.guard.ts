import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  const isLoggedIn = isBrowser && !!localStorage.getItem('token');

  return !isLoggedIn; // Prevent access if logged in
};
