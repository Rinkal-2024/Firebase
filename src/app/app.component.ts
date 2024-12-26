import { Component } from '@angular/core';
import { ConfigService } from './shared/config.service';
import * as firebase from 'firebase/compat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private configService: ConfigService){}
  title = 'fire-base-crud';
  firebaseConfig : any;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.firebaseConfig = {
      apiKey: this.configService.getEnv('firebaseApiKey'),
      authDomain: this.configService.getEnv('firebaseAuthDomain'),
      databaseURL: this.configService.getEnv('firebaseDatabaseURL'),
      projectId: this.configService.getEnv('firebaseProjectId'),
      storageBucket: this.configService.getEnv('firebaseStorageBucket'),
      messagingSenderId: this.configService.getEnv('firebaseMessagingSenderId'),
      appId: this.configService.getEnv('firebaseAppId'),
      measurementId: this.configService.getEnv('firebaseMeasurementId'),
    };
    // firebase.initializeApp(this.firebaseConfig);
  }
}
