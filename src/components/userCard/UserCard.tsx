import React from "react";
import type { User } from "../../types/user";
import * as S from "./UserCard.styles";

import editIcon from "../../assets/img/Card/pencil.svg";
import deleteIcon from "../../assets/img/card/trash.svg";
import plusIcon from "../../assets/img/Card/plus.svg";

export interface Props {
  user: User;
  checked: boolean;
  onToggle: (id: number, checked: boolean) => void;
  onEditRequest: () => void;
  onUpdate: (
    id: number,
    name: string,
    salary: number,
    companyValuation: number,
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
        hidden
      />
      <S.Info>
        <S.UserName>{user.name}</S.UserName>
        <S.InfoValues>
          Salário: R${" "}
          {user.salary.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </S.InfoValues>
        <S.InfoValues>
          Empresa: R${" "}
          {user.companyValuation.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </S.InfoValues>
      </S.Info>
      <S.Actions>
        <S.IconButton onClick={onEditRequest}>
          <img src={plusIcon} alt="Adicionar" />
        </S.IconButton>
        <S.IconButton onClick={onEditRequest}>
          <img src={editIcon} alt="Editar" />
        </S.IconButton>
        <S.IconButton onClick={onDelete}>
          <img src={deleteIcon} alt="Excluir" />
        </S.IconButton>
      </S.Actions>
    </S.Card>
  );
};

export default UserCard;
