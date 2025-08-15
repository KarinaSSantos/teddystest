import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 180px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
`;
