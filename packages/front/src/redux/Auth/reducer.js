import Immutable from 'seamless-immutable';
import { createReducer, completeState, completeReducer } from 'redux-recompose';

import { actions } from './actions';
import { TARGETS } from './constants';

const initialState = {
  onInitialLoad: true,
  [TARGETS.USER]: null
};

const completedState = completeState(initialState);

const reducerDescription = {
  primaryActions: [actions.SIGN_IN]
};

const reducer = createReducer(new Immutable(completedState), completeReducer(reducerDescription));

export default reducer;
