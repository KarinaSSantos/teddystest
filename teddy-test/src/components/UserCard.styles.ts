// UserCard.styles.ts
import styled from "styled-components";

export const Card = styled.div<{ selected?: boolean }>`
  border: 1px solid #e3e3e3;
  background: ${(p) => (p.selected ? "#f0f8ff" : "#fff")};
  padding: 12px;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Info = styled.div`
  flex: 1;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export const SmallInput = styled.input`
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ddd;
  width: 100%;
`;
