import React from "react";
import UsersList from "../../components/userList/UsersList";
import { useUserContext } from "../../contexts/UserContext";
import * as S from "../../pages/userListPage/UsersPage.styles";

const SelectedUsersPage: React.FC = () => {
  const { selectedClients, removeClientFromSelection, clearSelection } =
    useUserContext();

  if (selectedClients.length === 0) {
    return (
      <S.Container>
        <h2>Clientes Selecionados</h2>
        <p>Nenhum cliente selecionado na página</p>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <h2>Clientes Selecionados</h2>

      <UsersList
        users={selectedClients}
        selectedIds={new Set(selectedClients.map((u) => u.id))} // IDs da seleção do contexto
        selectionMode={true} // força o modo seleção
        onToggle={() => {}} // não precisa alterar
        onEditRequest={() => {}}
        onDelete={() => {}}
        onRemoveFromSelection={removeClientFromSelection} // remove do contexto
        onSelectAllOnPage={() => {}} // não aplicável aqui
      />

      <S.Button onClick={clearSelection}>Limpar seleção</S.Button>
    </S.Container>
  );
};

export default SelectedUsersPage;
