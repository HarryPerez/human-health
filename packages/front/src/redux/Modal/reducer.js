import Immutable from 'seamless-immutable';
import { createReducer, onSetValue } from 'redux-recompose';

import { actions } from './actions';

const reducerDescription = {
  [actions.OPEN_MODAL]: onSetValue(true),
  [actions.CLOSE_MODAL]: onSetValue(false),
  [actions.CLEAR_MODALS]: () => new Immutable({})
};

const reducer = createReducer(new Immutable({}), reducerDescription);

export default reducer;
