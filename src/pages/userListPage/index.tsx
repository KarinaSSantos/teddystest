import { useMemo, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import UsersList from "../../components/userList";
import ClientModal from "../../components/modal/userFormModal";
import ConfirmModal from "../../components/modal/confirmModal";
import SearchBar from "../../components/UserFilter/SearchBar";
import SortSelect from "../../components/UserFilter/SortSelect";
import type { SortOption } from "../../components/UserFilter/SortSelect";

import * as S from "./styles";
import Pagination from "../../components/pagination";
import PageLimitSelector from "../../components/pageLimitSelect";
import SearchResultInfo from "../../components/searchResultCount";
import { useUserContext } from "../../contexts/UserContext";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(16);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<SortOption>("name-asc");

  const { usersQuery, createMutation, updateMutation, deleteMutation } =
    useUsers(page, limit);

  const {
    selectedClients,
    addClientToSelection,
    removeClientFromSelection,
    clearSelection,
  } = useUserContext();

  const users = usersQuery.data?.clients ?? [];
  const totalPages = usersQuery.data?.totalPages ?? 1;
  const loading = usersQuery.isPending;
  const error = usersQuery.error as any;

  const filtered = useMemo(() => {
    if (!filter.trim()) return users;
    const q = filter.toLowerCase();
    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || String(u.id).includes(q),
    );
  }, [users, filter]);

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

  const selectedIds = new Set(selectedClients.map((c) => c.id));
  const selectionMode = selectedIds.size > 0;

  const onToggle = (id: number, checked: boolean) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    checked ? addClientToSelection(user) : removeClientFromSelection(id);
  };

  const onSelectAllOnPage = (select: boolean) => {
    users.forEach((u) =>
      select ? addClientToSelection(u) : removeClientFromSelection(u.id),
    );
  };

  const [clientModalVisible, setClientModalVisible] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const openCreateModal = () => {
    setClientToEdit(null);
    setClientModalVisible(true);
  };

  const openEditModal = (user: any) => {
    setClientToEdit(user);
    setClientModalVisible(true);
  };

  const handleSubmitClient = async (data: {
    name: string;
    salary: number;
    companyValuation: number;
  }) => {
    setModalLoading(true);
    try {
      if (clientToEdit) {
        await updateMutation.mutateAsync({ id: clientToEdit.id, ...data });
      } else {
        await createMutation.mutateAsync(data);
        setPage(1);
      }
      setClientModalVisible(false);
    } catch (err: any) {
      alert("Erro: " + (err?.message ?? "Erro desconhecido"));
    } finally {
      setModalLoading(false);
    }
  };

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const openDeleteModal = (user: any) => {
    setUserToDelete(user);
    setConfirmDeleteVisible(true);
  };
  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await deleteMutation.mutateAsync(userToDelete.id);
      removeClientFromSelection(userToDelete.id);
      setConfirmDeleteVisible(false);
    } catch {
      alert("Erro ao excluir cliente");
    }
  };

  return (
    <S.Container>
      <S.Controls>
        <SearchBar
          value={filter}
          onChange={setFilter}
          placeholder="Pesquisar por nome ou ID"
        />
        <SortSelect value={sort} onChange={(val) => val && setSort(val)} />
      </S.Controls>

      <S.SearchResultContainer>
        <SearchResultInfo loading={loading} count={filtered.length} />
        <PageLimitSelector
          value={limit}
          onChange={(v) => {
            setLimit(v);
            setPage(1);
          }}
        />
      </S.SearchResultContainer>

      {error && <p style={{ color: "red" }}>{error.message}</p>}

      <UsersList
        users={sortedUsers}
        selectedIds={selectedIds}
        selectionMode={selectionMode}
        onToggle={onToggle}
        onSelectAllOnPage={onSelectAllOnPage}
        onEditRequest={(id) => {
          const user = users.find((u) => u.id === id);
          if (!user) return alert("Usuário não encontrado");
          openEditModal(user);
        }}
        onDelete={(id) => {
          const user = users.find((u) => u.id === id);
          if (!user) return alert("Usuário não encontrado");
          openDeleteModal(user);
        }}
        onRemoveFromSelection={(id) => removeClientFromSelection(id)}
      />

      {selectionMode ? (
        <S.Button onClick={clearSelection}>
          Limpar clientes selecionados
        </S.Button>
      ) : (
        <S.Button onClick={openCreateModal}>Criar cliente</S.Button>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <ClientModal
        visible={clientModalVisible}
        onClose={() => setClientModalVisible(false)}
        title={clientToEdit ? "Editar cliente" : "Criar cliente"}
        initialData={
          clientToEdit
            ? {
                name: clientToEdit.name,
                salary: clientToEdit.salary,
                companyValuation: clientToEdit.companyValuation,
              }
            : undefined
        }
        onSubmit={handleSubmitClient}
        loading={modalLoading}
        mode={clientToEdit ? "edit" : "create"}
      />

      <ConfirmModal
        visible={confirmDeleteVisible}
        title="Excluir cliente"
        message={
          <p>
            Você está prestes a excluir o cliente:{" "}
            <strong>{userToDelete?.name}</strong>
          </p>
        }
        onClose={() => setConfirmDeleteVisible(false)}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </S.Container>
  );
}
