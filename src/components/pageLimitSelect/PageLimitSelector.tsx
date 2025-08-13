import React from "react";
import styled from "styled-components";

interface Props {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

const Label = styled.label`
  font-weight: 400;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 60px;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ddd;
`;

const PageLimitSelector: React.FC<Props> = ({
  value,
  min = 1,
  max = 100,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(min, Math.min(max, Number(e.target.value)));
    onChange(val);
  };

  return (
    <Label>
      Clientes por página:
      <Input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
      />
    </Label>
  );
};

export default PageLimitSelector;
