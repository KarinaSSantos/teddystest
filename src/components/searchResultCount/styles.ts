import styled, { keyframes } from "styled-components";

const loadingPulse = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 0.75rem);
`;

export const Title = styled.p`
  font-weight: 500;
  font-size: clamp(1rem, 2vw, 1.125rem);
  margin: 0;
  transition: all 0.3s ease;

  span {
    font-weight: 700;
    transition: all 0.3s ease;
  }
`;

export const LoadingText = styled.span`
  display: inline-block;
  font-weight: 500;
  font-size: clamp(1rem, 2vw, 1.125rem);
  animation: ${loadingPulse} 1.2s infinite;
`;
