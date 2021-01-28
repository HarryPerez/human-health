import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';

import { MODALS } from '~redux/Modal/constants';
import CustomModal from '~app/components/CustomModal';
import ModalActions from '~redux/Modal/actions';
import Button from '~app/components/Button';

import styles from './styles.module.scss';

function ModalExample() {
  const dispatch = useDispatch();
  const open = useSelector(state => state.modal[MODALS.EXAMPLE]);
  const openModal = () => dispatch(ModalActions.openModal(MODALS.EXAMPLE));
  const closeModal = () => dispatch(ModalActions.closeModal(MODALS.EXAMPLE));
  return (
    <div className={`full-width m-bottom-3 ${styles.container}`}>
      <span className="subtitle">{i18next.t('ModalExample:subtitle')}</span>
      <Button
        label={i18next.t('ModalExample:openModal')}
        onClick={openModal}
        type="button"
        className={`full-width ${styles.exampleButton}`}
      />
      <CustomModal
        className={styles.exampleModal}
        modal={MODALS.EXAMPLE}
        onClose={closeModal}
        isOpen={open}
        hideCloseButton>
        <div className={`full-width full-height column center m-bottom-1 ${styles.exampleContainer}`}>
          <span className="row center m-top-4 m-bottom-6">{i18next.t('ModalExample:description')}</span>
          <Button
            label={i18next.t('ModalExample:closeModal')}
            onClick={closeModal}
            type="button"
            className={`full-width ${styles.exampleButton}`}
          />
        </div>
      </CustomModal>
    </div>
  );
}

export default ModalExample;
