import styled, { keyframes } from "styled-components";

const fadeInScale = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`;

const fadeOutScale = keyframes`
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.95); }
`;

export const ModalOverlay = styled.div<{ visible: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${({ visible }) => (visible ? fadeInScale : fadeOutScale)} 0.2s
    ease forwards;
`;

export const ModalContent = styled.div<{ visible: boolean }>`
  background: white;
  border-radius: 0.5rem;
  width: clamp(20rem, 90%, 25rem);
  padding: clamp(1rem, 2vw, 1.5rem);
  box-shadow: 0 0 clamp(0.75rem, 2vw, 1rem) rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  animation: ${({ visible }) => (visible ? fadeInScale : fadeOutScale)} 0.2s
    ease forwards;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: clamp(1rem, 2vw, 1.25rem);
  }

  button {
    font-size: clamp(1.5rem, 4vw, 2rem);
    line-height: 1;
    border: none;
    background: unset;
    cursor: pointer;
    color: #000;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const ModalBody = styled.div`
  margin-top: clamp(0.5rem, 1.5vw, 1rem);
  font-size: clamp(0.875rem, 1.5vw, 1rem);
`;

export const ModalFooter = styled.div`
  margin-top: clamp(0.75rem, 2vw, 1rem);
  display: flex;
  justify-content: center;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  height: clamp(2.25rem, 5vw, 2.5rem);
  padding: clamp(0.5rem, 1vw, 0.75rem);
  font-weight: 700;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover:not(:disabled) {
    transform: scale(1.02);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
