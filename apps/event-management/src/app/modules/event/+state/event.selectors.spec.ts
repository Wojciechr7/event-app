import { EventEntity } from './event.models';
import { State, eventAdapter, initialState } from './event.reducer';
import * as EventSelectors from './event.selectors';

describe('Event Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEventId = (it) => it['id'];
  const createEventEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EventEntity);

  let state;

  beforeEach(() => {
    state = {
      event: eventAdapter.addAll(
        [
          createEventEntity('PRODUCT-AAA'),
          createEventEntity('PRODUCT-BBB'),
          createEventEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Event Selectors', () => {
    it('getAllEvent() should return the list of Event', () => {
      const results = EventSelectors.getAllEvent(state);
      const selId = getEventId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = EventSelectors.getSelected(state);
      const selId = getEventId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getEventLoaded() should return the current 'loaded' status", () => {
      const result = EventSelectors.getEventLoaded(state);

      expect(result).toBe(true);
    });

    it("getEventError() should return the current 'error' state", () => {
      const result = EventSelectors.getEventError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
