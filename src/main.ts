import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment.development';

fetch('/assets/config/config.json')
  .then(async (response) => {
    // Read response as text first to check if it's actually JSON
    const text = await response.text();
    
    // Check if response is actually JSON by trying to detect HTML
    if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
      throw new Error(`Received HTML instead of JSON. Status: ${response.status}`);
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}. Response: ${text.substring(0, 100)}`);
    }
    
    // Check content-type header as additional validation
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('application/json')) {
      throw new Error(`Expected JSON but got ${contentType}`);
    }
    
    // Parse as JSON
    try {
      return JSON.parse(text);
    } catch (parseError) {
      throw new Error(`Failed to parse JSON: ${parseError}. Response: ${text.substring(0, 100)}`);
    }
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
