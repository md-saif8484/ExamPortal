import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule, Routes } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebaruser',
  imports: [MatListModule,MatCardModule,MatIconModule,RouterModule,CommonModule],
  templateUrl: './sidebaruser.component.html',
  styleUrl: './sidebaruser.component.css'
})
export class SidebaruserComponent {
  categories:any;
  constructor(private login:LoginService,private router: Router,private _cat:CategoryService) {}
  ngOnInit() {
    this._cat.categories().subscribe((data)=>{
      this.categories = data;
    })
  }
  logout() {
    this.login.logout();
    this.router.navigate(['/login']); // Redirect to login after logout
  }
}
