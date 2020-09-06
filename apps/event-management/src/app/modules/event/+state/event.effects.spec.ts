import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { EventEffects } from './event.effects';
import * as EventActions from './event.actions';

describe('EventEffects', () => {
  let actions: Observable<any>;
  let effects: EventEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        EventEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(EventEffects);
  });

  describe('loadEvent$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: EventActions.loadEvent() });

      const expected = hot('-a-|', {
        a: EventActions.loadEventSuccess({ event: [] }),
      });

      expect(effects.loadEvent$).toBeObservable(expected);
    });
  });
});
