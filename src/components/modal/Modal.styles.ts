import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #0000004d;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Container = styled.div`
  background: white;
  border-radius: 4px;
  border: #d9d9d9;
  width: 100%;
  max-width: 400px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
`;

export const CloseButton = styled.button`
  background: unset;
  border: none;
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
  color: #333;
  padding: 0;
  margin: 0;
  user-select: none;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  button {
    padding: 12px;
  }
`;
