import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';
import { push } from 'connected-react-router';

import * as UserService from '~services/AuthService';
import { ROUTES } from '~constants/routes';

import { TARGETS } from './constants';

export const actions = createTypes(completeTypes(['SIGN_IN']), '@@AUTH');

export const actionCreators = {
  signIn: ({ email, password }) => ({
    type: actions.LOGIN,
    target: TARGETS.USER,
    payload: { email, password },
    service: UserService.signIn,
    injections: [
      withPostSuccess(dispatch => {
        // TODO: Persist token into api header and save user into state.
        dispatch(push(ROUTES.HOME));
      })
    ]
  })
};

export default actionCreators;
