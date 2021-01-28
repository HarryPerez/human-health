import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { func, string, bool } from 'prop-types';
import Modal from 'react-modal';
import cn from 'classnames';

import { noScroll } from '~utils/scroll';
import ModalActions from '~redux/Modal/actions';

import styles from './styles.module.scss';

function CustomModal({
  children,
  className,
  overlayClassName,
  shouldReturnFocusAfterClose,
  shouldCloseOnOverlayClick,
  onClose,
  modal,
  isOpen,
  ...props
}) {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(ModalActions.closeModal(modal));
  const clearAllModals = () => dispatch(ModalActions.clearModals());
  const clearModals = () => {
    if (onClose) {
      onClose();
    }
    clearAllModals();
  };

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    closeModal(modal);
  };

  const prevIsOpen = useRef(isOpen);

  useEffect(() => {
    window.addEventListener('popstate', clearModals, false);
    if (isOpen && !prevIsOpen.current) {
      noScroll.on();
    }
    if (!isOpen && prevIsOpen.current) {
      noScroll.off();
    }
    prevIsOpen.current = isOpen;
    return () => {
      noScroll.off();
      window.removeEventListener('popstate', clearModals);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevIsOpen, isOpen]);

  return (
    <Modal
      {...props}
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className={cn(styles.modalContainer, className)}
      overlayClassName={cn(styles.modalOverlay, overlayClassName)}
      shouldReturnFocusAfterClose={shouldReturnFocusAfterClose}
      bodyOpenClassName={styles.body}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}>
      {children}
    </Modal>
  );
}

CustomModal.propTypes = {
  modal: string.isRequired,
  className: string,
  isOpen: bool,
  overlayClassName: string,
  shouldCloseOnOverlayClick: bool,
  shouldReturnFocusAfterClose: bool,
  onClose: func
};

CustomModal.defaultProps = {
  shouldCloseOnOverlayClick: true,
  shouldReturnFocusAfterClose: false
};

export default CustomModal;
