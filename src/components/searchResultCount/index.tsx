import React from "react";
import { Container, Title, LoadingText } from "./styles";

interface Props {
  loading: boolean;
  count: number;
}

const SearchResultInfo: React.FC<Props> = ({ loading, count }) => {
  return (
    <Container>
      {loading ? (
        <LoadingText>Carregando clientes...</LoadingText>
      ) : (
        <Title>
          <span>{count}</span> clientes encontrados.
        </Title>
      )}
    </Container>
  );
};

export default SearchResultInfo;
