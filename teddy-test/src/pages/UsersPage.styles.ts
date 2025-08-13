import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  font-family: Inter, sans-serif;
`;

export const Controls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: 0;
  background: #0077ff;
  color: white;
  cursor: pointer;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  margin-bottom: 12px;

  input {
    margin-top: 4px;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ddd;
    font-size: 16px;
  }
`;

export const ModalButton = styled.button`
  padding: 10px 14px;
  border-radius: 8px;
  border: 0;
  background: #0077ff;
  color: white;
  cursor: pointer;
  font-weight: 600;
  margin-top: 12px;
`;
