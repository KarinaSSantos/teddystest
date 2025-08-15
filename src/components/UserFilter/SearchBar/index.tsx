import React from "react";
import * as S from "./styles";
import { FiSearch } from "react-icons/fi";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <S.Container>
      <S.IconWrapper>
        <FiSearch size={18} />
      </S.IconWrapper>
      <S.Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Pesquisar..."}
      />
    </S.Container>
  );
};

export default SearchBar;
