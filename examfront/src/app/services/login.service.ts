import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // generate-token
  public generateToken(loginData:any)
  {
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  // loggin : store token in localstorage
  public tokenStore(token: string | null)
  {
    if (!token) {
      console.warn("Token is null or undefined");
      return;
    }
    localStorage.setItem("token",token);
    return true;
  }

  // user is loggedin or not

  public isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage) { // Ensure we're in the browser
      let tokenStr = localStorage.getItem("token");
      return !(tokenStr == null || tokenStr === '' || tokenStr === undefined);
    }
    return false; // If in a non-browser environment, assume not logged in
  }
  

  // logout method
  public logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get token
  public getToken()
  {
    return localStorage.getItem('token');
  }


  // set userDetail
  public setUser(user:any)
  {
    localStorage.setItem("user",JSON.stringify(user));
  }

  // get user
  public getUser()
  {
    let userStr = localStorage.getItem('user');
    if(userStr != null)
    {
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }

  // get role
  public getUserRole()
  {
    let user = this.getUser();
    if(user==null)
    {
      return null;
    }
    return user.authorities[0].authority;
  }

}
