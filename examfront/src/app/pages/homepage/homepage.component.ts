import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-homepage',
  imports: [NavbarComponent,MatIconModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
