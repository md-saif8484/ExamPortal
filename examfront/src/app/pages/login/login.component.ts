import { Component } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { JsonPipe, CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule,MatFormFieldModule,MatInputModule,MatSnackBarModule,FormsModule,JsonPipe,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    public loginData = {
      username:"",
      password:"",
    }
    constructor(private snack:MatSnackBar,private login:LoginService) {}
    formSubmit()
    {
      console.log("login button clicked");
      if(this.loginData.username.trim()=='' || this.loginData.username==null)
      {
        this.snack.open("Username is required!!","",{
          duration:2000,
        });
        return;
      }

      if(this.loginData.password.trim()=='' || this.loginData.password==null)
      {
        this.snack.open("password is required!!","",{
          duration:2000,
        });
        return;
      }

      // request server to generate token
      this.login.generateToken(this.loginData).subscribe(
        (data:any) => {
          console.log("success");
          console.log(data);

          // login
          this.login.tokenStore(data.token);

          this.login.getCurrentUser().subscribe(
            (user:any)=> {
              this.login.setUser(user);
              console.log(user);

              // redirect .. dashboard
              // console.log(this.login.getUserRole());
              if(this.login.getUserRole()=="Admin")
              {
                console.log(this.login.getUserRole());
                window.location.href = '/admin';
              }else if(this.login.getUserRole()=="Normal")
              {
                console.log(this.login.getUserRole());
                window.location.href = '/user-dashboard';
              }else{
                this.login.logout();
              }
            }
          );

        },
        (error) => {
          console.log(error);
          console.log("Error  !");
          this.snack.open("Invalid details!! try again","",{
            duration:2000,
          });
        }
      )
    }


}
