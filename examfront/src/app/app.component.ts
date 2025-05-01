import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatButtonModule,NavbarComponent,MatButtonModule,MatFormFieldModule,NgxUiLoaderModule,
    NgxUiLoaderHttpModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'examfront';
}
