import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [MatListModule,MatCardModule,MatIconModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
