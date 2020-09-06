import { EventEntity } from './event.models';
import * as EventActions from './event.actions';
import { State, initialState, reducer } from './event.reducer';

describe('Event Reducer', () => {
  const createEventEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EventEntity);

  beforeEach(() => {});

  describe('valid Event actions', () => {
    it('loadEventSuccess should return set the list of known Event', () => {
      const event = [
        createEventEntity('PRODUCT-AAA'),
        createEventEntity('PRODUCT-zzz'),
      ];
      const action = EventActions.loadEventSuccess({ event });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
