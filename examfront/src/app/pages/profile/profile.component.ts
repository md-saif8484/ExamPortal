import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  imports: [MatCardModule,CommonModule,MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user:any = null;
  constructor(private login:LoginService) {}

  ngOnInit() : void{
    this.user = this.login.getUser();
  }

}
