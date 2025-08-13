import React from "react";
import styled from "styled-components";

interface Props {
  loading: boolean;
  count: number;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 18px;
  margin: 0;

  span {
    font-weight: 700;
  }
`;

const SearchResultInfo: React.FC<Props> = ({ loading, count }) => {
  return (
    <Container>
      <Title>
        {loading ? (
          "Carregando clientes..."
        ) : (
          <>
            <span>{count}</span> clientes encontrados.
          </>
        )}
      </Title>
    </Container>
  );
};

export default SearchResultInfo;
