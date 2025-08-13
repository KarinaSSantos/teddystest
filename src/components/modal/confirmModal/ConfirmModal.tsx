import React from "react";
import * as S from "./ConfirmModal.styles";

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
  if (!visible) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <h3>{title}</h3>
          <button onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </S.ModalHeader>
        <S.ModalBody>{message}</S.ModalBody>
        <S.ModalFooter>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{ backgroundColor: "#EC6724", color: "white" }}
          >
            {loading ? "Excluindo..." : "Excluir cliente"}
          </button>
        </S.ModalFooter>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default ConfirmModal;
