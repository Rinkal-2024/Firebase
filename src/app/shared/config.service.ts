import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }
  getEnv(key: string): string {
    return (window as any).__env[key] || '';
  }
}
