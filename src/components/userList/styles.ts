import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 2vw, 1rem);
  justify-content: space-between;
  width: 100%;
  margin-bottom: clamp(0.75rem, 2vw, 1.25rem);

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(0.5rem, 2vw, 1rem);
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.25rem, 1.5vw, 0.5rem);
  margin-bottom: clamp(0.25rem, 1.5vw, 0.5rem);
`;
