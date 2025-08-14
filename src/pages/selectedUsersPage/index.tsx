import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import UserCard from "../../components/userCard";
import * as S from "../userListPage/styles";
import { Container } from "../../components/userList/styles";

export default function SelectedUsersPage() {
  const { selectedClients, removeClientFromSelection, clearSelection } =
    useUserContext(); // contexto global
  const navigate = useNavigate();

  const selectionMode = selectedClients.length > 0;

  if (selectedClients.length === 0) {
    return (
      <S.Container>
        <h2>Nenhum cliente selecionado.</h2>
        <S.Button
          onClick={() => {
            navigate("/users");
          }}
        >
          Voltar para listagem
        </S.Button>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <h2>Clientes Selecionados</h2>

      <Container>
        {selectedClients.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            checked={true}
            selectionMode={selectionMode}
            onToggle={() => {}}
            onEditRequest={() => {}}
            onDelete={() => {}}
            onRemoveFromSelection={() => removeClientFromSelection(user.id)}
          />
        ))}
      </Container>

      <S.Button
        onClick={() => {
          clearSelection();
          navigate("/users");
        }}
      >
        Limpar seleção
      </S.Button>
    </S.Container>
  );
}
