import styled from "styled-components";

export const Card = styled.div<{ selected?: boolean }>`
  border: 1px solid #e3e3e3;
  background: ${(p) => (p.selected ? "#f0f8ff" : "#fff")};
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 285px;
  height: 138px;
  box-shadow: 0px 0px 4px 0px #0000001a;
  text-align: center;
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const UserName = styled.div`
  font-weight: 700;
  font-size: 16px;
`;

export const InfoValues = styled.p`
  font-weight: 400;
  font-size: 14px;
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  justify-content: space-between;
  width: 100%;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  padding: 4px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    display: block;
  }

  &:hover img {
    opacity: 0.8;
  }
`;

export const SmallInput = styled.input`
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ddd;
  width: 100%;
`;
