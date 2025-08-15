import styled, { keyframes } from "styled-components";

const fadeInScale = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`;

const fadeOutScale = keyframes`
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.95); }
`;

export const Overlay = styled.div<{ animateOut?: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${({ animateOut }) => (animateOut ? fadeOutScale : fadeInScale)}
    0.2s ease forwards;
`;

export const Container = styled.div<{ visible?: boolean }>`
  background: white;
  border-radius: 8px;
  width: clamp(20rem, 90%, 25rem);
  max-width: 90%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;

  animation: ${({ visible }) => (visible ? fadeInScale : fadeOutScale)} 0.2s
    ease forwards;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: clamp(0.5rem, 1.5vw, 1rem);
`;

export const Title = styled.h2`
  margin: 0;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 700;
`;

export const CloseButton = styled.button`
  background: unset;
  border: none;
  font-size: clamp(1.5rem, 4vw, 2rem);
  line-height: 1;
  cursor: pointer;
  color: #000;
  padding: 0;
  margin: 0;
  transition: transform 0.2s ease;
  user-select: none;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1.5vw, 1rem);
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

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 16px;
  box-sizing: border-box;
`;
