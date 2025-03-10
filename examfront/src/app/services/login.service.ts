import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private loginStatus = new BehaviorSubject<boolean>(this.isTokenAvailable());
  private userSubject = new BehaviorSubject<any>(this.getUser());

  constructor(private http: HttpClient) {}

  // ✅ Get the current login status as an observable
  public getLoginStatus() {
    return this.loginStatus.asObservable();
  }

   // ✅ Observable to get user updates in Navbar
   public getUserObservable() {
    return this.userSubject.asObservable();
  }

  // ✅ Get the currently logged-in user
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // ✅ Generate token and log in the user
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // ✅ Store token in localStorage and update loginStatus
  public tokenStore(token: string | null) {
    if (!token) {
      console.warn("Token is null or undefined");
      return;
    }
    localStorage.setItem("token", token);
    this.loginStatus.next(true);  // Notify components about login status change
    return true;
  }

  // ✅ Check if user is logged in
  public isLoggedIn(): boolean {
    return this.loginStatus.value;
  }

  // ✅ Logout: Remove token & user, and update login status
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatus.next(false);  // Notify components about logout
    return true;
  }

  // ✅ Get stored token
  public getToken() {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token');
    }
    console.warn("localStorage is not available, returning null.");
    return null;
  }

  // ✅ Store user details
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
    this.userSubject.next(user);  // 🔥 Notify user update
  }

  // ✅ Get user details
  public getUser() {
    if (typeof window !== 'undefined' && localStorage) {  // ✅ Ensure localStorage is accessible
      let userStr = localStorage.getItem('user');
      if (userStr != null) {
        return JSON.parse(userStr);
      }
    }
    return null;  // ✅ Return null instead of calling logout
  }

  // ✅ Get user role
  public getUserRole(): string | null {
    let user = this.getUser();

    if (!user) {
      console.warn("getUserRole: No user found, returning null.");
      return null;
    }

    console.log("getUserRole: User data found:", user);

    if (!user.authorities || user.authorities.length === 0) {
      console.warn("getUserRole: User has no authorities, returning null.");
      return null;
    }

    console.log("getUserRole: Role extracted:", user.authorities[0].authority);
    return user.authorities[0].authority;
  }

  // ✅ Check if token exists in localStorage
  private isTokenAvailable(): boolean {
    if (typeof window !== 'undefined' && localStorage) {  
      return localStorage.getItem('token') !== null;
    }
    return false;
  }
}
