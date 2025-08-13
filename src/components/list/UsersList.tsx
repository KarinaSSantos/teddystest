import React from "react";
import type { User } from "../../types/user";
import UserCard from "../userCard/UserCard";
import * as S from "./Userslist.styles";

interface Props {
  users: User[];
  selectedIds: Set<number>;
  onToggle: (id: number, checked: boolean) => void;
  onSelectAllOnPage: (select: boolean) => void;
  onEditRequest: (id: number) => void;
  onUpdate: (
    id: number,
    name: string,
    salary: number,
    companyValuation: number,
  ) => Promise<void>;
  onDelete: (id: number) => void;
}

const UsersList: React.FC<Props> = ({
  users,
  selectedIds,
  onToggle,
  onSelectAllOnPage,
  onEditRequest,
  onUpdate,
  onDelete,
}) => {
  const allSelected =
    users.length > 0 && users.every((u) => selectedIds.has(u.id));
  return (
    <div>
      <S.HeaderRow>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => onSelectAllOnPage(e.target.checked)}
        />
        <span>Selecionar todos da página</span>
      </S.HeaderRow>

      <S.Container>
        {users.map((u) => (
          <UserCard
            key={u.id}
            user={u}
            checked={selectedIds.has(u.id)}
            onToggle={onToggle}
            onEditRequest={() => onEditRequest(u.id)}
            onUpdate={onUpdate}
            onDelete={() => onDelete(u.id)}
          />
        ))}
      </S.Container>
    </div>
  );
};

export default UsersList;
