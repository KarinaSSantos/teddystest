import React, { useEffect, useState } from "react";
import * as S from "./styles";

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
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timeout = setTimeout(() => setShow(false), 200); // esperar animação
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!show) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <S.ModalOverlay visible={visible} onClick={handleOverlayClick}>
      <S.ModalContent visible={visible}>
        <S.ModalHeader>
          <h3>{title}</h3>
          <button onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </S.ModalHeader>
        <S.ModalBody>{message}</S.ModalBody>
        <S.ModalFooter>
          <S.ConfirmButton onClick={onConfirm} disabled={loading}>
            {loading ? "Excluindo..." : "Excluir cliente"}
          </S.ConfirmButton>
        </S.ModalFooter>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default ConfirmModal;
