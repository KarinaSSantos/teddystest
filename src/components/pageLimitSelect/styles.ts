import styled from "styled-components";

export const Label = styled.label`
  font-weight: 400;
  font-size: clamp(0.875rem, 2vw, 1.125rem);
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 0.75rem);
`;

export const Input = styled.input`
  width: clamp(3rem, 10vw, 4rem);
  padding: clamp(0.25rem, 1vw, 0.5rem);
  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: clamp(0.875rem, 2vw, 1rem);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }
`;
