import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { JsonPipe, CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-signup',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,FormsModule,
    JsonPipe,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private userService:UserService){}
  public user = {
    username:" ",
    password:" ",
    firstname:" ",
    lastname:" ",
    email:" ",
    phone:" ",
  }
  formSubmit()
  {
    console.log(this.user);
    if(this.user.username=="" || this.user.username==null)
    {
      alert('User is required');
      return;
    }
    this.userService.addUser(this.user)
      .subscribe(
        (data)=>{
          console.log(data);
          alert("success");
          this.user = {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
          };
        },
        (error)=>{
          console.log(error);
          alert("something went wrong");
        }
      );
    
  }
}
