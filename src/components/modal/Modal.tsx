import React from "react";
import * as S from "./Modal.styles";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, title }) => {
  return (
    <S.Overlay onClick={onClose}>
      <S.Container onClick={(e) => e.stopPropagation()}>
        <S.Header>
          {title && <S.Title>{title}</S.Title>}
          <S.CloseButton onClick={onClose} aria-label="Fechar modal">
            &times;
          </S.CloseButton>
        </S.Header>
        <S.Content>{children}</S.Content>
      </S.Container>
    </S.Overlay>
  );
};

export default Modal;
