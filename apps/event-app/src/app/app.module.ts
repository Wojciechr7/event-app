import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { LayoutModule } from "./modules/layout/layout.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    LayoutModule,
    RouterModule,
    RouterModule.forRoot([{
      path: '',
      loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule)
    }])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
