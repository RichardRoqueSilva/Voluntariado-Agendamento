import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RedDirective } from '../../../directives/red.directive';
import { ForDirective } from '../../../directives/for.directive';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, RedDirective,],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css',],
  standalone: true
})
export class FooterComponent {

}
