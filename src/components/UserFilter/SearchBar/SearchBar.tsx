import React from "react";
import * as S from "./SearchBar.styles";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <S.Container>
      <label>
        Pesquisar:
        <S.Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Pesquisar..."}
        />
      </label>
    </S.Container>
  );
};

export default SearchBar;
