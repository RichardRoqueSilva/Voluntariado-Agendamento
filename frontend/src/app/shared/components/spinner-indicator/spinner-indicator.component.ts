import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner-indicator',
  imports: [CommonModule, MatProgressSpinnerModule],
  standalone: true,
  templateUrl: './spinner-indicator.component.html',
  styleUrl: './spinner-indicator.component.css',
})
export class SpinnerIndicatorComponent {}
