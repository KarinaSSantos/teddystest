import { useMemo, useState, useEffect } from "react";
import { useUsers } from "../../hooks/useUsers";
import UsersList from "../../components/userList/UsersList";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import ConfirmModal from "../../components/modal/confirmModal/ConfirmModal";
import SearchBar from "../../components/UserFilter/SearchBar/SearchBar";
import SortSelect from "../../components/UserFilter/SortSelect/SortSelect";
import type { SortOption } from "../../components/UserFilter/SortSelect/SortSelect";

import * as S from "./UsersPage.styles";
import Pagination from "../../components/pagination/Pagination";
import PageLimitSelector from "../../components/pageLimitSelect/PageLimitSelector";
import SearchResultInfo from "../../components/searchResultCount/SearchResultInfo";

export default function UsersPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const newClientName =
    (location.state as { newClientName?: string })?.newClientName || "";

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(16);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [selectionMode, setSelectionMode] = useState(false);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<SortOption>("name-asc");

  const {
    usersQuery,
    createMutation,
    updateMutation,
    deleteMutation,
    deleteMany,
  } = useUsers(page, limit);

  useEffect(() => {
    setSelectionMode(selectedIds.size > 0);
  }, [selectedIds]);

  const users = usersQuery.data?.clients ?? [];
  const totalPages = usersQuery.data?.totalPages ?? 1;
  const loading = usersQuery.isPending;
  const error = usersQuery.error as any;

  // Filtragem e ordenação
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

  const onToggle = (id: number, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  const onSelectAllOnPage = (select: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      users.forEach((u) => (select ? next.add(u.id) : next.delete(u.id)));
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Excluir ${selectedIds.size} usuário(s)?`)) return;
    await deleteMany(Array.from(selectedIds));
    clearSelection();
  };

  // --- Modais de criar ---
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [newCompanyValuation, setNewCompanyValuation] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreateClient = async () => {
    if (!newName.trim()) return alert("Digite um nome válido");
    const salaryNum = Number(newSalary.replace(",", "."));
    const valuationNum = Number(newCompanyValuation.replace(",", "."));
    if (isNaN(salaryNum) || salaryNum < 0)
      return alert("Digite um salário válido");
    if (isNaN(valuationNum) || valuationNum < 0)
      return alert("Digite um valor de empresa válido");

    setCreating(true);
    try {
      await createMutation.mutateAsync({
        name: newName.trim(),
        salary: salaryNum,
        companyValuation: valuationNum,
      });
      setNewName("");
      setNewSalary("");
      setNewCompanyValuation("");
      setModalOpen(false);
      setPage(1);
    } catch (err: any) {
      alert("Erro ao criar cliente: " + (err?.message || "Erro desconhecido"));
    } finally {
      setCreating(false);
    }
  };

  // --- Modais de editar ---
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [editSalary, setEditSalary] = useState("");
  const [editCompanyValuation, setEditCompanyValuation] = useState("");
  const [updating, setUpdating] = useState(false);

  const openEditModal = (user: any) => {
    setUserToEdit(user);
    setEditName(user.name);
    setEditSalary(String(user.salary));
    setEditCompanyValuation(String(user.companyValuation));
    setEditModalOpen(true);
  };

  const handleEditUser = async () => {
    if (!userToEdit) return;
    if (!editName.trim()) return alert("Digite um nome válido");

    const salaryNum = Number(editSalary.replace(",", "."));
    const valuationNum = Number(editCompanyValuation.replace(",", "."));
    if (isNaN(salaryNum) || salaryNum < 0)
      return alert("Digite um salário válido");
    if (isNaN(valuationNum) || valuationNum < 0)
      return alert("Digite um valor de empresa válido");

    setUpdating(true);
    try {
      await updateMutation.mutateAsync({
        id: userToEdit.id,
        name: editName.trim(),
        salary: salaryNum,
        companyValuation: valuationNum,
      });
      setEditModalOpen(false);
      setUserToEdit(null);
    } catch (err: any) {
      alert(
        "Erro ao atualizar usuário: " + (err?.message ?? "Erro desconhecido"),
      );
    } finally {
      setUpdating(false);
    }
  };

  // --- Modais de deletar ---
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const openDeleteModal = (user: any) => {
    setUserToDelete(user);
    setConfirmDeleteVisible(true);
  };

  const closeDeleteModal = () => {
    setConfirmDeleteVisible(false);
    setUserToDelete(null);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await deleteMutation.mutateAsync(userToDelete.id);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(userToDelete.id);
        return next;
      });
      closeDeleteModal();
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
        <SortSelect value={sort} onChange={setSort} />
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
        onRemoveFromSelection={(id) =>
          setSelectedIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          })
        }
      />

      {selectionMode ? (
        <S.Button onClick={clearSelection}>
          Limpar clientes selecionados
        </S.Button>
      ) : (
        <S.Button onClick={() => setModalOpen(true)}>Criar cliente</S.Button>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Modal Criar */}
      {modalOpen && (
        <Modal title="Criar cliente:" onClose={() => setModalOpen(false)}>
          <S.Input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nome"
            autoFocus
          />
          <S.Input
            type="text"
            value={newSalary}
            onChange={(e) => setNewSalary(e.target.value)}
            placeholder="Salário"
          />
          <S.Input
            type="text"
            value={newCompanyValuation}
            onChange={(e) => setNewCompanyValuation(e.target.value)}
            placeholder="Valor da empresa"
          />
          <S.Button onClick={handleCreateClient} disabled={creating}>
            {creating ? "Criando..." : "Criar Cliente"}
          </S.Button>
        </Modal>
      )}

      {/* Modal Editar */}
      {editModalOpen && (
        <Modal title="Editar cliente:" onClose={() => setEditModalOpen(false)}>
          <S.Input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            autoFocus
          />
          <S.Input
            type="text"
            value={editSalary}
            onChange={(e) => setEditSalary(e.target.value)}
            placeholder="Salário"
          />
          <S.Input
            type="text"
            value={editCompanyValuation}
            onChange={(e) => setEditCompanyValuation(e.target.value)}
            placeholder="Valor da empresa"
          />
          <S.Button onClick={handleEditUser} disabled={updating}>
            {updating ? "Salvando..." : "Editar cliente"}
          </S.Button>
        </Modal>
      )}

      {/* Modal Confirm Delete */}
      <ConfirmModal
        visible={confirmDeleteVisible}
        title="Excluir cliente:"
        message={
          <p>
            Você está prestes a excluir o cliente:{" "}
            <strong>{userToDelete?.name}</strong>
          </p>
        }
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </S.Container>
  );
}
