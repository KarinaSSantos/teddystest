import React from "react";
import type { User } from "../../types/user";
import * as S from "./styles";

import editIcon from "../../assets/img/Card/pencil.svg";
import deleteIcon from "../../assets/img/card/trash.svg";
import plusIcon from "../../assets/img/Card/plus.svg";
import minusIcon from "../../assets/img/Card/minus.svg";

interface Props {
  user: User;
  checked: boolean;
  selectionMode?: boolean;
  onToggle: (id: number, checked: boolean) => void;
  onEditRequest: () => void;
  onDelete: () => void;
  onRemoveFromSelection?: () => void;
}

const UserCard: React.FC<Props> = ({
  user,
  checked,
  selectionMode = false,
  onToggle,
  onEditRequest,
  onDelete,
  onRemoveFromSelection,
}) => {
  return (
    <S.Card selected={checked}>
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

      <S.Actions selectionMode={selectionMode && checked}>
        {selectionMode ? (
          <S.IconButton onClick={onRemoveFromSelection}>
            <img src={minusIcon} alt="Remover da seleção" />
          </S.IconButton>
        ) : (
          <>
            <S.IconButton onClick={() => onToggle(user.id, !checked)}>
              <img src={plusIcon} alt="Adicionar à seleção" />
            </S.IconButton>
            <S.IconButton onClick={onEditRequest}>
              <img src={editIcon} alt="Editar" />
            </S.IconButton>
            <S.IconButton onClick={onDelete}>
              <img src={deleteIcon} alt="Excluir" />
            </S.IconButton>
          </>
        )}
      </S.Actions>
    </S.Card>
  );
};

export default UserCard;
