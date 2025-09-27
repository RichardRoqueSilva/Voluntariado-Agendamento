import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
})
export class FooterComponent {}
