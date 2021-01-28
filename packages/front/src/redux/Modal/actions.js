import { createTypes, completeTypes } from 'redux-recompose';

export const actions = createTypes(
  completeTypes([], ['OPEN_MODAL', 'CLOSE_MODAL', 'CLEAR_MODALS']),
  '@@MODAL'
);

export const actionCreators = {
  openModal: modalName => ({
    type: actions.OPEN_MODAL,
    target: modalName
  }),
  closeModal: modalName => ({
    type: actions.CLOSE_MODAL,
    target: modalName
  }),
  clearModals: () => ({
    type: actions.CLEAR_MODALS
  })
};

export default actionCreators;
