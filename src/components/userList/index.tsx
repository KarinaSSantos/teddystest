import React from "react";
import type { User } from "../../types/user";
import UserCard from "../userCard";
import * as S from "./styles";

interface Props {
  users: User[];
  selectedIds: Set<number>;
  selectionMode: boolean;
  onToggle: (id: number, checked: boolean) => void;
  onSelectAllOnPage: (select: boolean) => void;
  onEditRequest: (id: number) => void;
  onDelete: (id: number) => void;
  onRemoveFromSelection: (id: number) => void;
}

const UsersList: React.FC<Props> = ({
  users,
  selectedIds,
  selectionMode,
  onToggle,
  onEditRequest,
  onDelete,
  onRemoveFromSelection,
}) => {
  return (
    <div>
      <S.Container>
        {users.map((u) => (
          <UserCard
            key={u.id}
            user={u}
            checked={selectedIds.has(u.id)}
            selectionMode={selectionMode && selectedIds.has(u.id)}
            onToggle={onToggle}
            onEditRequest={() => onEditRequest(u.id)}
            onDelete={() => onDelete(u.id)}
            onRemoveFromSelection={() => onRemoveFromSelection(u.id)}
          />
        ))}
      </S.Container>
    </div>
  );
};

export default UsersList;
