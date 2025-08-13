import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  div {
    width: 521px;
    gap: 20px;
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 36px;
  line-height: 100%;
`;

export const Input = styled.input`
  padding: 16px 20px;
  font-size: 18px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  width: -webkit-fill-available;
`;

export const Button = styled.button`
  padding: 16px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: 0;
  cursor: pointer;
  width: 100%;
`;
