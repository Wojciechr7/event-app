import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AngularFireMessaging } from "@angular/fire/messaging";
import { CLOUD_MESSAGING_TOKEN } from "../firebase-config";
import { Store } from "@ngrx/store";
import { AppPartialState } from "./+state/app.reducer";

@Component({
  selector: 'event-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  token: string;

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private store: Store<AppPartialState>,
    private resolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit() {
    this.requestPermission();
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
