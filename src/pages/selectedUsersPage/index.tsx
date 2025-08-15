import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import UserCard from "../../components/userCard";
import SearchBar from "../../components/UserFilter/SearchBar";
import SortSelect from "../../components/UserFilter/SortSelect";
import type { SortOption } from "../../components/UserFilter/SortSelect";

import * as S from "../userListPage/styles";
import { Container } from "../../components/userList/Userslist.styles";

export default function SelectedUsersPage() {
  const { selectedClients, removeClientFromSelection, clearSelection } =
    useUserContext();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<SortOption>("name-asc");

  const selectionMode = selectedClients.length > 0;

  const filtered = useMemo(() => {
    if (!filter.trim()) return selectedClients;
    const q = filter.toLowerCase();
    return selectedClients.filter(
      (u) => u.name.toLowerCase().includes(q) || String(u.id).includes(q),
    );
  }, [selectedClients, filter]);

  const sortedUsers = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "name-asc":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        arr.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "salary-asc":
        arr.sort((a, b) => a.salary - b.salary);
        break;
      case "salary-desc":
        arr.sort((a, b) => b.salary - a.salary);
        break;
      case "valuation-asc":
        arr.sort((a, b) => a.companyValuation - b.companyValuation);
        break;
      case "valuation-desc":
        arr.sort((a, b) => b.companyValuation - a.companyValuation);
        break;
    }
    return arr;
  }, [filtered, sort]);

  if (selectedClients.length === 0) {
    return (
      <S.Container>
        <p>Nenhum cliente selecionado.</p>
        <S.Button onClick={() => navigate("/users")}>
          Voltar para listagem
        </S.Button>
      </S.Container>
    );
  }

  return (
    <S.Container>
      {/* Controles de busca e filtro */}
      <S.Controls>
        <SearchBar
          value={filter}
          onChange={setFilter}
          placeholder="Pesquisar por nome ou ID"
        />
        <SortSelect value={sort} onChange={(val) => val && setSort(val)} />
      </S.Controls>

      <h2>Clientes Selecionados</h2>

      {/* Lista de cards */}
      <Container>
        {sortedUsers.map((user) => (
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
