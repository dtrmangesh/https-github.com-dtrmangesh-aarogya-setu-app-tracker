import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {
  HttpClientModule,
} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DiagnosticService } from './services/diagnostic.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import {config} from '../environments/environment'
import { Market } from '@ionic-native/market/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Diagnostic,
    DiagnosticService,
    AppAvailability,
    AngularFirestore,
    Market,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
