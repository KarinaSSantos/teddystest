import styled from "styled-components";

export const Card = styled.div<{ selected?: boolean }>`
  border: 1px solid #e3e3e3;
  background: ${(p) => (p.selected ? "#f0f8ff" : "#fff")};
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: clamp(10rem, 40%, 18rem);
  min-height: clamp(7rem, 15vw, 8.625rem);
  box-shadow: 0px 0px 0.25rem 0px #0000001a;
  text-align: center;
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0px 0px 0.5rem 0px #00000033;
  }

  @media (min-width: 768px) {
    width: 285px;
    min-height: 138px;
  }
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const UserName = styled.div`
  font-weight: 700;
  font-size: clamp(0.875rem, 2vw, 1rem);

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const InfoValues = styled.p`
  margin: 0;
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const Actions = styled.div<{ selectionMode?: boolean }>`
  display: flex;
  gap: 0.5rem;
  justify-content: ${({ selectionMode }) =>
    selectionMode ? "flex-end" : "space-between"};
  width: 100%;
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    margin-top: 1rem;
  }
`;

export const IconButton = styled.button`
  background-color: unset;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  img {
    width: 1.25rem;
    height: 1.25rem;
    display: block;
  }

  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
    background-color: unset;
  }
`;

export const SmallInput = styled.input`
  padding: 0.375rem;
  border-radius: 0.375rem;
  border: 1px solid #ddd;
  width: 100%;
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  transition:
    border-color 0.2s ease,
    color 0.2s ease;

  &::placeholder {
    color: #999;
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
