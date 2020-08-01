import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { AngularFireMessaging } from "@angular/fire/messaging";
import { CLOUD_MESSAGING_TOKEN } from "../firebase-config";
import { select, Store } from "@ngrx/store";
import { AppPartialState } from "./+state/app.reducer";
import { getDialogData } from "./+state/app.selectors";
import { filter, map } from "rxjs/operators";

@Component({
  selector: 'event-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild("container", { read: ViewContainerRef }) container;

  token: string;
  displayDialog: boolean = false;
  component$;

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private store: Store<AppPartialState>,
    private resolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit() {
    this.requestPermission();
    this.component$ = this.store.pipe(select(getDialogData), filter(v => !!v), map(v => {
      console.log(v)
      this.displayDialog = true;
      this.container.clear();
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(v.component);
      const componentRef: ComponentRef<any> = this.container.createComponent(factory);
      return factory;
    }))
  }

  test() {
    console.log(this.token)
  }

  subToTopic() {
    this.subscribeTokenToTopic(this.token, 'all');
  }

  updateApp() {
    window.location.reload();
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.token = token;
        this.subscribeTokenToTopic(token, 'all');
        console.log(token);
      },
      (err) => {
        this.token = err;
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
      })
  }

  private subscribeTokenToTopic(token, topic) {
    fetch('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topic, {
      method: 'POST',
      headers: new Headers({
        'Authorization': `key=${ CLOUD_MESSAGING_TOKEN }`
      })
    }).then(response => {
      if (response.status < 200 || response.status >= 400) {
        throw 'Error subscribing to topic: ' + response.status + ' - ' + response.text();
      }
      console.log('Subscribed to "' + topic + '"');
    }).catch(error => {
      console.error(error);
    })
  }

}
