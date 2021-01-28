import Immutable from 'seamless-immutable';
import { createReducer, completeState, completeReducer } from 'redux-recompose';

import { actions } from './actions';
import { TARGETS } from './constants';

const initialState = {
  [TARGETS.UPLOAD_IMAGE]: null
};

const completedState = completeState(initialState);

const reducerDescription = {
  primaryActions: [actions.UPLOAD_IMAGE]
};

const reducer = createReducer(new Immutable(completedState), completeReducer(reducerDescription));

export default reducer;
