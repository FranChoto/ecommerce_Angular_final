import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  // proveo el httpCLient para usar en toda la app
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()), provideHttpClient()]
};
