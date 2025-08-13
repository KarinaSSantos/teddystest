import React from "react";
import * as S from "./SortSelect.styles";

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "salary-asc"
  | "salary-desc"
  | "valuation-asc"
  | "valuation-desc";

interface Props {
  value: SortOption;
  onChange: (val: SortOption) => void;
}

const SortSelect: React.FC<Props> = ({ value, onChange }) => {
  return (
    <label>
      Filtrar:
      <S.Select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        <option value="name-asc">Nome A ➔ Z</option>
        <option value="name-desc">Nome Z ➔ A</option>
        <option value="salary-asc">Salário menor ⇵</option>
        <option value="salary-desc">Salário maior ⇅</option>
        <option value="valuation-asc">Empresa menor ⇵</option>
        <option value="valuation-desc">Empresa maior ⇅</option>
      </S.Select>
    </label>
  );
};

export default SortSelect;
