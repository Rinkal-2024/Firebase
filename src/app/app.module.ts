import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';

import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { environment } from 'src/environments/environment.development';
import { ConfigService } from './shared/config.service';

// Get Firebase config from window.__env (set in main.ts)
// This function is called lazily when Angular initializes the module
function getFirebaseConfig() {
  const env = (window as any).__env;
  if (!env) {
    // Try to get from environment as fallback
    const fallbackEnv = environment.firebase;
    if (fallbackEnv) {
      return fallbackEnv;
    }
    throw new Error('Firebase config not loaded. Make sure config.json exists at /assets/config/config.json');
  }
  return {
    apiKey: env.firebaseApiKey,
    authDomain: env.firebaseAuthDomain,
    databaseURL: env.firebaseDatabaseURL,
    projectId: env.firebaseProjectId,
    storageBucket: env.firebaseStorageBucket,
    messagingSenderId: env.firebaseMessagingSenderId,
    appId: env.firebaseAppId,
    measurementId: env.firebaseMeasurementId
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,

    VerifyEmailComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(getFirebaseConfig()),
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
