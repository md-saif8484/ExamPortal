import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { JsonPipe, CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,FormsModule,
    JsonPipe,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private userService:UserService,private snack:MatSnackBar){}
  public user = {
    username:"",
    password:"",
    firstname:"",
    lastname:"",
    email:"",
    phone:"",
  }
  formSubmit()
  {
    console.log(this.user);
    if(this.user.username=="" || this.user.username==null)
    {
      // alert('User is required');
      this.snack.open("Username is required!!","",{
        duration:2000,
      });
      return;
    }

    // adding user
    this.userService.addUser(this.user)
      .subscribe(
        (data:any)=>{
          console.log("data: ", data);
          // alert("success");
          // this.snack.open("Successfully registered!!","",{
          //   duration:2000,
          // });
          Swal.fire("",data.username+'  is registered succssfully!!',"success");
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
          // alert("something went wrong");
          // Check if the error message is available in the backend response
          const errorMessage = error.error?.message || "Something went wrong";
          this.snack.open(errorMessage,"",{
            duration:2000,
            verticalPosition:'top',
            horizontalPosition:'right'
          });
        }
      );
    
  }
}
