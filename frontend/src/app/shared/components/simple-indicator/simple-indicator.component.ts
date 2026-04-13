import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-simple-indicator',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './simple-indicator.component.html',
  styleUrl: './simple-indicator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleIndicatorComponent {

  @Input()
  public value!: number | string | null

  @Input()
  public valueIfNull!: number | string

  @Input()
  public title!: string

  constructor(){}
}
