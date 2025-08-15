import React from "react";
import { Label, Input } from "./styles";

interface Props {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

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
