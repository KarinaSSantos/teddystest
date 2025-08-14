import styled from "styled-components";

export const Select = styled.select`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 14px;
  cursor: pointer;
  margin-left: 8px;
`;
