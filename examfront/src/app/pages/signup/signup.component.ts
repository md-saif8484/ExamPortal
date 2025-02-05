import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { JsonPipe, CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,FormsModule,JsonPipe,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
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
    alert('submit');
  }
}
