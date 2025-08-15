import React from "react";
import Modal from "../modalBase";
import * as S from "../modalBase/styles";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: React.ReactNode;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  loading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  onClose,
  onConfirm,
  loading = false,
}) => {
  return (
    <Modal visible={visible} title={title} onClose={onClose}>
      {message}
      <S.ConfirmButton onClick={onConfirm} disabled={loading}>
        {loading ? "Excluindo..." : "Excluir cliente"}
      </S.ConfirmButton>
    </Modal>
  );
};

export default ConfirmModal;
