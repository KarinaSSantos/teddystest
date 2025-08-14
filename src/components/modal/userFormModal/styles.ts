import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: #0000004d;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 360px;
  max-width: 90%;
  padding: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
  }

  button {
    font-size: 24px;
    line-height: 1;
    border: none;
    background: unset;
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    display: flex;
    flex-direction: column;
    font-weight: 600;
  }
`;

export const ModalFooter = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;

  button {
    padding: 10px 16px;
    font-weight: 600;
    border-radius: 6px;
    border: none;
    background-color: #ec6724;
    color: white;
    cursor: pointer;
  }
`;
