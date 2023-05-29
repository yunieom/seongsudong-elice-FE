export interface ModalState {
  isConfirmModalOpen: boolean;
  isChatModalOpen: boolean;
  isMyRevervationModalOpen: boolean;
}

export interface ModalProps {
  modalName: string;
  modalContent: string;
}
