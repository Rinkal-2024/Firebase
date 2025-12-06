import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment.development';

fetch('/assets/config/config.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((config) => {
    (window as any).__env = config; // Attach config to the global window object
    if (environment.production) {
      enableProdMode();
    }
    platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
  })
  .catch((error) => {
    console.error('Error loading config.json:', error);
    console.error('Make sure config.json exists at /assets/config/config.json');
    // Still bootstrap the app, but it may not work without config
    if (environment.production) {
      enableProdMode();
    }
    platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
  })
