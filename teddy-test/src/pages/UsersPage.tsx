import { useMemo, useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import UsersList from '../components/UsersList';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import * as S from './UsersPage.styles';

type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'salary-asc'
  | 'salary-desc'
  | 'valuation-asc'
  | 'valuation-desc';

export default function UsersPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const newClientName =
    (location.state as { newClientName?: string })?.newClientName || '';

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(16);
  const [sort, setSort] = useState<SortOption>('name-asc');

  const {
    usersQuery,
    createMutation,
    updateMutation,
    deleteMutation,
    deleteMany
  } = useUsers(page, limit);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState('');

  const users = usersQuery.data?.clients ?? [];
  const totalPages = usersQuery.data?.totalPages ?? 1;
  const loading = usersQuery.isPending;
  const error = usersQuery.error as any;

  // Modal criação cliente
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newCompanyValuation, setNewCompanyValuation] = useState('');
  const [creating, setCreating] = useState(false);

  // Modal edição cliente
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<{
    id: number;
    name: string;
    salary: number;
    companyValuation: number;
  } | null>(null);
  const [editName, setEditName] = useState('');
  const [editSalary, setEditSalary] = useState('');
  const [editCompanyValuation, setEditCompanyValuation] = useState('');
  const [updating, setUpdating] = useState(false);

  // Modal exclusão cliente
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  // Filtro texto
  const filtered = useMemo(() => {
    if (!filter.trim()) return users;
    const q = filter.toLowerCase();
    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || String(u.id).includes(q)
    );
  }, [users, filter]);

  // Ordenação
  const sortedUsers = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case 'name-asc':
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        arr.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'salary-asc':
        arr.sort((a, b) => a.salary - b.salary);
        break;
      case 'salary-desc':
        arr.sort((a, b) => b.salary - a.salary);
        break;
      case 'valuation-asc':
        arr.sort((a, b) => a.companyValuation - b.companyValuation);
        break;
      case 'valuation-desc':
        arr.sort((a, b) => b.companyValuation - a.companyValuation);
        break;
    }
    return arr;
  }, [filtered, sort]);

  // Toggle seleção
  const onToggle = (id: number, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  // Selecionar todos na página
  const onSelectAllOnPage = (select: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      users.forEach((u) => {
        if (select) next.add(u.id);
        else next.delete(u.id);
      });
      return next;
    });
  };

  // Handle criação cliente
  const handleCreateClient = async () => {
    if (!newName.trim()) {
      alert('Digite um nome válido.');
      return;
    }
    const salaryNum = Number(newSalary.replace(',', '.'));
    const valuationNum = Number(newCompanyValuation.replace(',', '.'));
    if (isNaN(salaryNum) || salaryNum < 0) {
      alert('Digite um salário válido.');
      return;
    }
    if (isNaN(valuationNum) || valuationNum < 0) {
      alert('Digite um valor de empresa válido.');
      return;
    }

    setCreating(true);
    try {
      await createMutation.mutateAsync({
        name: newName.trim(),
        salary: salaryNum,
        companyValuation: valuationNum
      });
      setNewName('');
      setNewSalary('');
      setNewCompanyValuation('');
      setModalOpen(false);
      setPage(1);
    } catch (err: any) {
      alert('Erro ao criar cliente: ' + (err?.message || 'Erro desconhecido'));
    } finally {
      setCreating(false);
    }
  };

  // Abrir modal edição
  const openEditModal = (user: {
    id: number;
    name: string;
    salary: number;
    companyValuation: number;
  }) => {
    setUserToEdit(user);
    setEditName(user.name);
    setEditSalary(String(user.salary));
    setEditCompanyValuation(String(user.companyValuation));
    setEditModalOpen(true);
  };

  // Salvar edição
  const handleEditUser = async () => {
    if (!userToEdit) return;

    if (!editName.trim()) {
      alert('Digite um nome válido.');
      return;
    }

    const salaryNum = Number(editSalary.replace(',', '.'));
    const valuationNum = Number(editCompanyValuation.replace(',', '.'));

    if (isNaN(salaryNum) || salaryNum < 0) {
      alert('Digite um salário válido.');
      return;
    }
    if (isNaN(valuationNum) || valuationNum < 0) {
      alert('Digite um valor de empresa válido.');
      return;
    }

    setUpdating(true);
    try {
      await updateMutation.mutateAsync({
        id: userToEdit.id,
        name: editName.trim(),
        salary: salaryNum,
        companyValuation: valuationNum
      });
      setEditModalOpen(false);
      setUserToEdit(null);
    } catch (err: any) {
      alert(
        'Erro ao atualizar usuário: ' + (err?.message ?? 'Erro desconhecido')
      );
    } finally {
      setUpdating(false);
    }
  };

  // Abre modal exclusão
  const openDeleteModal = (user: { id: number; name: string }) => {
    setUserToDelete(user);
    setConfirmDeleteVisible(true);
  };

  // Fecha modal exclusão
  const closeDeleteModal = () => {
    setConfirmDeleteVisible(false);
    setUserToDelete(null);
  };

  // Executa exclusão após confirmação
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
      alert('Erro ao excluir cliente');
    }
  };

  // Logout
  const handleLogout = () => {
    navigate('/', { replace: true });
  };

  // Deletar múltiplos com confirm (usa confirm padrão)
  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Excluir ${selectedIds.size} usuário(s)?`)) return;
    await deleteMany(Array.from(selectedIds));
    setSelectedIds(new Set());
  };

  return (
    <S.Container>
      <h2>Usuários</h2>

      <div style={{ marginBottom: 12 }}>
        Cliente cadastrado: <strong>{newClientName || 'Nenhum'}</strong>
      </div>

      <S.Controls>
        <S.Label>
          Filtrar:
          <input
            placeholder="Nome ou ID"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: 6, fontSize: 16 }}
          />
        </S.Label>

        <S.Label>
          Ordenar por:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
          >
            <option value="name-asc">Nome A-Z</option>
            <option value="name-desc">Nome Z-A</option>
            <option value="salary-asc">Salário menor</option>
            <option value="salary-desc">Salário maior</option>
            <option value="valuation-asc">Empresa menor</option>
            <option value="valuation-desc">Empresa maior</option>
          </select>
        </S.Label>

        <S.Label>
          Clientes por página:
          <input
            type="number"
            min={1}
            max={100}
            value={limit}
            onChange={(e) => {
              const value = Math.max(1, Math.min(100, Number(e.target.value)));
              setLimit(value);
              setPage(1);
            }}
            style={{ width: 60, padding: 6 }}
          />
        </S.Label>

        <S.Button
          onClick={() => setModalOpen(true)}
          style={{ whiteSpace: 'nowrap' }}
        >
          Criar cliente
        </S.Button>

        <S.Button onClick={handleLogout}>Sair</S.Button>
      </S.Controls>

      <p>
        {loading
          ? 'Carregando clientes...'
          : `Foram encontrados ${filtered.length} cliente(s) nesta página.`}
      </p>

      {error && <p style={{ color: 'red' }}>{error.message}</p>}

      <UsersList
        users={sortedUsers}
        selectedIds={selectedIds}
        onToggle={onToggle}
        onSelectAllOnPage={onSelectAllOnPage}
        onEditRequest={(id) => {
          const user = users.find((u) => u.id === id);
          if (!user) {
            alert('Usuário não encontrado');
            return;
          }
          openEditModal(user);
        }}
        onUpdate={async (id, name, salary, companyValuation) => {
          try {
            await updateMutation.mutateAsync({
              id,
              name,
              salary,
              companyValuation
            });
          } catch {
            alert('Erro ao atualizar usuário');
          }
        }}
        onDelete={(id) => {
          const user = users.find((u) => u.id === id);
          if (!user) return alert('Usuário não encontrado');
          openDeleteModal(user);
        }}
      />

      <div
        style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}
      >
        <S.Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          Anterior
        </S.Button>
        <div>
          Página {page} de {totalPages}
        </div>
        <S.Button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
        >
          Próxima
        </S.Button>
      </div>

      {/* Modal para criar cliente */}
      {modalOpen && (
        <Modal title="Criar cliente:" onClose={() => setModalOpen(false)}>
          <S.Label>
            Digite o nome:
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              autoFocus
            />
          </S.Label>
          <S.Label>
            Digite o salário:
            <input
              type="text"
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              placeholder="Ex: 5000,00"
            />
          </S.Label>
          <S.Label>
            Digite o valor da empresa:
            <input
              type="text"
              value={newCompanyValuation}
              onChange={(e) => setNewCompanyValuation(e.target.value)}
              placeholder="Ex: 15000,00"
            />
          </S.Label>

          <S.Button onClick={handleCreateClient} disabled={creating}>
            {creating ? 'Criando...' : 'Criar Cliente'}
          </S.Button>
        </Modal>
      )}

      {/* Modal para editar cliente */}
      {editModalOpen && (
        <Modal title="Editar usuário:" onClose={() => setEditModalOpen(false)}>
          <S.Label>
            Nome:
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
            />
          </S.Label>
          <S.Label>
            Salário:
            <input
              type="text"
              value={editSalary}
              onChange={(e) => setEditSalary(e.target.value)}
              placeholder="Ex: 5000,00"
            />
          </S.Label>
          <S.Label>
            Valor da empresa:
            <input
              type="text"
              value={editCompanyValuation}
              onChange={(e) => setEditCompanyValuation(e.target.value)}
              placeholder="Ex: 15000,00"
            />
          </S.Label>

          <S.Button onClick={handleEditUser} disabled={updating}>
            {updating ? 'Salvando...' : 'Salvar'}
          </S.Button>
        </Modal>
      )}

      {/* Modal para confirmar exclusão */}
      <ConfirmModal
        visible={confirmDeleteVisible}
        title="Excluir cliente:"
        message={
          <p>
            Você está prestes a excluir o cliente:{' '}
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
