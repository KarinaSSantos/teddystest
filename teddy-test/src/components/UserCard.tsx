import React from "react";
import type { User } from "../types/user";
import * as S from "./UserCard.styles";

export interface Props {
  user: User;
  checked: boolean;
  onToggle: (id: number, checked: boolean) => void;
  onEditRequest: () => void;
  onUpdate: (
    id: number,
    name: string,
    salary: number,
    companyValuation: number
  ) => Promise<void>;
  onDelete: () => void;
}

const UserCard: React.FC<Props> = ({
  user,
  checked,
  onToggle,
  onEditRequest,
  onDelete,
}) => {
  return (
    <S.Card selected={checked}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onToggle(user.id, e.target.checked)}
        onClick={(e) => e.stopPropagation()}
      />
      <S.Info>
        <div style={{ fontWeight: 600 }}>{user.name}</div>
        <div style={{ fontSize: 13, color: "#666" }}>
          Salário: R${" "}
          {user.salary.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          • Empresa: R${" "}
          {user.companyValuation.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </S.Info>
      <S.Actions>
        <button onClick={onEditRequest}>Editar</button>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          Excluir
        </button>
      </S.Actions>
    </S.Card>
  );
};

export default UserCard;
