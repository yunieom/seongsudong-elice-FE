import React, { useEffect } from 'react';
import styles from './cancelReservationBtn.module.scss';
import ConfirmModal from 'components/common/ConfirmModal';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import {
  openConfirmModal,
  closeConfirmModal,
  closeMyReservationModal,
} from 'reducers/modal';

import { cancelMyReservation } from 'actions/myReservation';

function CancelReservationBtn() {
  const { isConfirmModalOpen } = useAppSelector(state => state.modal);
  const { cancelMyReservationDone, cancelMyReservationError } = useAppSelector(
    state => state.myReservation,
  );
  const dispatch = useAppDispatch();

  const myReservationDetail = useAppSelector(
    state => state.myReservation.myReservationDetail,
  );

  const handleOpenModal = () => {
    dispatch(openConfirmModal());
  };

  const handleCancelReservation = () => {
    dispatch(cancelMyReservation(myReservationDetail.reservation_id));
  };

  const handleCompleteCancel = () => {
    dispatch(closeConfirmModal());
    dispatch(closeMyReservationModal());
    window.location.reload();
  };

  return (
    <>
      {isConfirmModalOpen && (
        <ConfirmModal
          modalMessage='해당 예약을 취소하시겠습니까?'
          modalController={handleCancelReservation}
        />
      )}
      {cancelMyReservationDone && isConfirmModalOpen && (
        <ConfirmModal
          modalMessage='예약이 취소되었습니다!😉'
          modalController={handleCompleteCancel}
        />
      )}
      {cancelMyReservationError && isConfirmModalOpen && (
        <ConfirmModal
          modalMessage='지난 예약은 취소할 수 없습니다.🥹'
          modalController={handleCompleteCancel}
        />
      )}
      <button
        type='submit'
        className={styles.calcelButton}
        onClick={handleOpenModal}
      >
        <div className={styles.text}>예약 취소하기</div>
      </button>
    </>
  );
}

export default CancelReservationBtn;
