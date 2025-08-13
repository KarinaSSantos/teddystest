import styled from "styled-components";

export const Container = styled.div`
  flex-wrap: wrap;
  display: grid;
  gap: 16px;
  justify-content: space-between;
  max-width: -webkit-fill-available;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-bottom: 20px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;
