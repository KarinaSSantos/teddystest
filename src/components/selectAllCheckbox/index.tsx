import React from "react";
import type { User } from "../../types/user";
import * as S from "../userList/Userslist.styles";

interface Props {
  users: User[];
  selectedIds: Set<number>;
  onSelectAllOnPage: (select: boolean) => void;
}

const SelectAllCheckbox: React.FC<Props> = ({
  users,
  selectedIds,
  onSelectAllOnPage,
}) => {
  const allSelected =
    users.length > 0 && users.every((u) => selectedIds.has(u.id));

  return (
    <S.HeaderRow>
      <input
        type="checkbox"
        checked={allSelected}
        onChange={(e) => onSelectAllOnPage(e.target.checked)}
      />
      <span>Selecionar todos da página</span>
    </S.HeaderRow>
  );
};

export default SelectAllCheckbox;
