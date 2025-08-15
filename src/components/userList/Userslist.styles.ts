import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(0.5rem, 2vw, 1rem);
  width: 100%;
  margin-bottom: clamp(0.75rem, 2vw, 1.25rem);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 769px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1201px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: clamp(0.25rem, 1.5vw, 0.5rem);
  margin-bottom: clamp(0.25rem, 1.5vw, 0.5rem);
`;
