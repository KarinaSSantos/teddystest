import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(1rem, 5vw, 2rem);
  margin: 0 auto;
  width: 80%;
  max-width: 50rem;

  div {
    width: 100%;
    max-width: 32.5rem;
    display: flex;
    flex-direction: column;
    gap: clamp(1rem, 5vw, 1.5rem);
  }
`;

export const Title = styled.h1`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: clamp(2rem, 5vw, 2.5rem);
  line-height: 1.1;
`;

export const Input = styled.input`
  width: 100%;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.25rem);
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  border-radius: 0.25rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  transition: border-color 0.2s ease-in-out;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: clamp(0.75rem, 2vw, 1rem);
  border-radius: 0.25rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: 0;
  cursor: pointer;
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  transition:
    background-color 0.2s ease-in-out,
    opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;
