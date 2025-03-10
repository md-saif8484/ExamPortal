import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule,MatIconModule,MatButtonModule,RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  username: string | null = '';


  constructor(public login: LoginService, private router: Router) {}

  ngOnInit() {
        // ✅ Listen for login status updates
        this.login.getLoginStatus().subscribe(status => {
          this.isLoggedIn = status;
        });
    
        // ✅ Listen for user updates
        this.login.getUserObservable().subscribe(user => {
          this.username = user ? user.username : null;
        });

      // ✅ Initialize values on page load
      this.isLoggedIn = this.login.isLoggedIn();
      const user = this.login.getUser();
      this.username = user ? user.username : null;
  }

  

  logout() {
    this.login.logout();
    this.router.navigate(['/login']); // Redirect to login after logout
  }


}
