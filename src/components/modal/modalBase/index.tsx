import React, { useEffect, useState } from "react";
import * as S from "./styles";

export interface ModalProps {
  visible: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ visible, title, onClose, children }) => {
  const [show, setShow] = useState(visible);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      setAnimateOut(false);
      document.body.style.overflow = "hidden";
    } else if (show) {
      setAnimateOut(true);
      document.body.style.overflow = "";
      const timeout = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [visible, show]);

  if (!show) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <S.Overlay onClick={handleOverlayClick} animateOut={animateOut}>
      <S.Container visible={!animateOut}>
        <S.Header>
          {title && <S.Title>{title}</S.Title>}
          <S.CloseButton onClick={onClose} aria-label="Fechar">
            &times;
          </S.CloseButton>
        </S.Header>
        <S.Content>{children}</S.Content>
      </S.Container>
    </S.Overlay>
  );
};

export default Modal;
