import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  placeholder,
  autoFocus,
}) => {
  const [display, setDisplay] = useState(value ? formatBRL(value) : "");

  useEffect(() => {
    setDisplay(value ? formatBRL(value) : "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const numericValue = raw ? Number(raw) / 100 : 0;

    setDisplay(raw ? formatBRL(numericValue) : "");
    onChange(numericValue);
  };

  return (
    <Input
      type="text"
      value={display}
      onChange={handleChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
  );
};

export default CurrencyInput;
