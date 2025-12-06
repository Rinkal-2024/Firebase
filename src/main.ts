import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment.development';

fetch('/assets/config/config.json')
  .then(async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Check if response is actually JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Expected JSON but got ${contentType}. Response: ${text.substring(0, 100)}`);
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
    console.warn('Error loading config.json, using environment fallback:', error.message);
    // Set a flag so app.module.ts knows to use environment fallback
    (window as any).__env = null;
    if (environment.production) {
      enableProdMode();
    }
    platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
  })
