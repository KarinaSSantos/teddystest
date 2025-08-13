import React from "react";
import type { User } from "../types/user";
import UserCard from "./UserCard";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  gap: 12px;
`;

interface Props {
  users: User[];
  selectedIds: Set<number>;
  onToggle: (id: number, checked: boolean) => void;
  onSelectAllOnPage: (select: boolean) => void;
  onEditRequest: (id: number) => void; // abre modal edição
  onUpdate: (
    id: number,
    name: string,
    salary: number,
    companyValuation: number
  ) => Promise<void>; // salvar edição
  onDelete: (id: number) => void; // abre modal exclusão
}

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

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
      <HeaderRow>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => onSelectAllOnPage(e.target.checked)}
        />
        <span>Selecionar todos da página</span>
      </HeaderRow>

      <Container>
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
      </Container>
    </div>
  );
};

export default UsersList;
