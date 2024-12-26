import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment.development';

fetch('/assets/config/config.json')
  .then((response) => response.json())
  .then((config) => {
    (window as any).__env = config; // Attach config to the global window object
    if (environment.production) {
      enableProdMode();
    }
    platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
  })
