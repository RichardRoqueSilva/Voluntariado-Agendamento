import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';

import { Chart } from 'chart.js';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import CustomColors from './app.chart-custom-colors';
import { routes } from './app.routes';

Chart.register(CustomColors);

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR',
    },
    {
      provide: Window,
      useValue: window,
    },
    {
      provide: Storage,
      useValue: localStorage,
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideEnvironmentNgxMask(),
    provideNativeDateAdapter(),
    provideNgxMask(),
    provideCharts(withDefaultRegisterables()),
  ],
};
