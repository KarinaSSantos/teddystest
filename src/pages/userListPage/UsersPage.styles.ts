import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 0;
  font-family: Inter, sans-serif;
  background-color: ${({ theme }) => theme.colors.background};
  margin: 0 auto;
  max-width: 90%;
`;

export const Controls = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const Button = styled.button`
  padding: 12px;
  border-radius: 6px;
  border: solid 2px ${({ theme }) => theme.colors.primary};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 900;
  cursor: pointer;
  width: 100%;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: row;
  font-weight: 400;
  margin-bottom: 12px;
  gap: 8px;
  align-items: center;
`;

export const Input = styled.input`
  padding: 11px 14px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  font-size: 16px;
  width: -webkit-fill-available;
`;

export const ModalButton = styled.button`
  padding: 10px 14px;
  border-radius: 8px;
  border: 0;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  font-weight: 600;
  margin-top: 12px;
`;

export const SearchResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

export const SearchResultTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 0;

  span {
    font-weight: 700;
  }
`;

export const SearchInput = styled.input`
  width: 300px;
  padding: 8px;
`;

export const FilterSelect = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  font-size: 16px;
  background: #f5f5f5;
`;

export const Pagination = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 12px;
  justify-content: center;
`;
