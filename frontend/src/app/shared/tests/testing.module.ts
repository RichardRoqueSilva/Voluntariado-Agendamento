import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideNgxMask } from 'ngx-mask';
import { LocalStorageMock } from './local-storage-mock';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    {
      provide: Window,
      useValue: window,
    },
    {
      provide: Storage,
      useClass: LocalStorageMock,
    },
    provideHttpClient(),
    provideHttpClientTesting(),
    provideNoopAnimations(),
    provideNativeDateAdapter(),
    provideNgxMask(),
    provideCharts(withDefaultRegisterables()),
  ],
})
export class TestingModule {}
