import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background-color: ${(p) => (p.active ? p.theme.colors.primary : "#f0f0f0")};
  color: ${(p) => (p.active ? "#fff" : "#000")};

  &:hover {
    background-color: ${(p) => (p.active ? p.theme.colors.primary : "#e0e0e0")};
  }
`;

export const Ellipsis = styled.span`
  padding: 6px 12px;
`;
