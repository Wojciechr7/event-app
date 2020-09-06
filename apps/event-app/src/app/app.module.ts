import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LayoutModule } from './modules/layout/layout.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromApp from './+state/app.reducer';
import { AppEffects } from './+state/app.effects';
import { NxModule } from "@nrwl/angular";
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BaseModule } from "../../../../libs/base/src/lib/base.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BaseModule,
    FullCalendarModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    NxModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    LayoutModule,
    RouterModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('./modules/layout/layout.module').then((m) => m.LayoutModule),
      },
    ]),
    StoreModule.forRoot(
      { router: routerReducer, app: fromApp.reducer }, {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        },
        initialState: {
          router: {
            state: {
              url: '/',
              params: {},
              queryParams: {}
            },
            navigationId: 0
          },
          app: fromApp.initialState
        }
      }
    ),
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
