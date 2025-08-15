import React from "react";
import ReactSelect from "react-select";
import type { SingleValue, StylesConfig } from "react-select";
import {
  FiArrowUp,
  FiArrowDown,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import styled from "styled-components";

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "salary-asc"
  | "salary-desc"
  | "valuation-asc"
  | "valuation-desc";

interface OptionType {
  value: SortOption;
  label: string;
  icon: React.ReactNode;
}

interface Props {
  value?: SortOption;
  onChange: (val?: SortOption) => void;
}

const options: OptionType[] = [
  { value: "name-asc", label: "Nome A-Z", icon: <FiArrowDown /> },
  { value: "name-desc", label: "Nome Z-A", icon: <FiArrowUp /> },
  { value: "salary-asc", label: "Salário menor", icon: <FiTrendingDown /> },
  { value: "salary-desc", label: "Salário maior", icon: <FiTrendingUp /> },
  { value: "valuation-asc", label: "Empresa menor", icon: <FiTrendingDown /> },
  { value: "valuation-desc", label: "Empresa maior", icon: <FiTrendingUp /> },
];

const Container = styled.div`
  width: 100%;

  @media (min-width: 480px) {
    max-width: 250px;
  }
`;

const customStyles: StylesConfig<OptionType, false> = {
  control: (provided) => ({
    ...provided,
    borderRadius: 6,
    borderColor: "#ccc",
    backgroundColor: "unset",
    minHeight: 46,
    fontSize: 14,
    boxShadow: "none",
    "&:hover": {
      borderColor: "#ccc",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    gap: 6,
  }),
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    gap: 6,
    backgroundColor: state.isFocused ? "#f0f0f0" : "unset",
    color: "#333",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 4,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#999",
  }),
};

const SortSelect: React.FC<Props> = ({ value, onChange }) => {
  const selectedOption = options.find((o) => o.value === value) || null;

  return (
    <Container>
      <ReactSelect<OptionType, false>
        value={selectedOption}
        onChange={(opt: SingleValue<OptionType>) => onChange(opt?.value)}
        options={options}
        styles={customStyles}
        isClearable
        placeholder="Ordenar por"
        formatOptionLabel={(option) => (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {option.icon}
            {option.label}
          </div>
        )}
      />
    </Container>
  );
};

export default SortSelect;
