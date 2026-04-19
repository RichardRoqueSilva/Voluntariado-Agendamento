import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SpinnerIndicatorComponent } from '../spinner-indicator/spinner-indicator.component';

@Component({
  selector: 'app-simple-indicator',
  standalone: true,
  imports: [CommonModule, MatCardModule, SpinnerIndicatorComponent],
  templateUrl: './simple-indicator.component.html',
  styleUrl: './simple-indicator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleIndicatorComponent {
  @Input()
  public value!: number | string | null;

  @Input()
  public valueIfNull!: number | string;

  @Input()
  public title!: string;

  @Input()
  public loading!: boolean;

  constructor() {}
}
