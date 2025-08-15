import styled from "styled-components";

interface ButtonProps {
  variant?: "primary" | "danger";
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  padding: clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.5rem);
  font-weight: 700;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  background-color: ${({ variant, theme }) =>
    variant === "danger" ? "#EC6724" : theme.colors.primary};
  color: white;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover:not(:disabled) {
    transform: scale(1.02);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
