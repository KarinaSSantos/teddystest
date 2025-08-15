import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 6px 10px;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  max-width: 300px;

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 6px 8px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textLight};
`;

export const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.family};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;
