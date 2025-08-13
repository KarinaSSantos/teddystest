import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Input = styled.input`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 14px;
  width: 200px;
  margin-left: 8px;
`;
