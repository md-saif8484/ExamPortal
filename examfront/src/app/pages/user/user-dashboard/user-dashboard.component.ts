import { Component } from '@angular/core';
import { SidebaruserComponent } from '../sidebaruser/sidebaruser.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [SidebaruserComponent,RouterOutlet],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
