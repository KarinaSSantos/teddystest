import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Geologica:wght@100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.font.family};
    transition: all 0.2s ease-in-out;
  }

  html {
    font-size: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }

  h1 { font-size: clamp(1.75rem, 4vw, 2.25rem); }
  h2 { font-size: clamp(1.5rem, 3vw, 2rem); }
  h3 { font-size: clamp(1.25rem, 2.5vw, 1.75rem); }
  h4 { font-size: clamp(1.125rem, 2vw, 1.5rem); }
  h5 { font-size: clamp(1rem, 1.8vw, 1.25rem); }
  h6 { font-size: clamp(0.875rem, 1.5vw, 1rem); }

  p {
    font-size: clamp(0.75rem, 1.5vw, 0.875rem);
    font-weight: 400;
    margin-bottom: 1rem;
  }

  small {
    font-size: clamp(0.75rem, 1.5vw, 0.875rem);
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-size: clamp(0.875rem, 2vw, 1rem);
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
      border-radius: 2px;
    }
    &:active {
      color: ${({ theme }) => theme.colors.secondary};
      opacity: 0.85;
    }
  }

  ul, ol {
    margin-left: 1.25rem;
    margin-bottom: 1rem;
    font-size: clamp(0.875rem, 2vw, 1rem);
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: clamp(0.875rem, 1.8vw, 1rem);
    font-weight: 500;
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: 1rem;
    font-style: italic;
    font-size: clamp(0.9rem, 2vw, 1.125rem);
    color: ${({ theme }) => theme.colors.text};
    margin: 1rem 0;
  }

  button, input, textarea, select {
    font-family: ${({ theme }) => theme.font.family};
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 0.5rem 1rem;
    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: #fff;
    }
    &:focus-visible {
      outline: 1px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 1px;
    }
    &:active {
      background-color: ${({ theme }) => theme.colors.primary};
      opacity: 0.9;
      color: #fff;
    }
  }

  input, textarea, select {
    background-color: #fff;
    color: ${({ theme }) => theme.colors.text};

    &::placeholder {
    color: ${({ theme }) => theme.colors.textplaceholder}; 
    opacity: 0.6;
  }

    &:focus-visible {
      outline: 1px solid ${({ theme }) => theme.colors.secondary};
      border-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;
