// src/components/UserFormModal.tsx
import React, { useState, useEffect } from "react";
import * as S from "./UserFormModal.styles"

export interface UserFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; salary: number; companyValuation: number }) => Promise<void>;
  initialData?: { name: string; salary: number; companyValuation: number };
  title: string;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  title,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [salary, setSalary] = useState(initialData?.salary.toString() || "");
  const [companyValuation, setCompanyValuation] = useState(
    initialData?.companyValuation.toString() || ""
  );
  const [loading, setLoading] = useState(false);

  // Atualiza os dados quando inicialData mudar (ex: abrir modal de edição com dados diferentes)
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSalary(initialData.salary.toString());
      setCompanyValuation(initialData.companyValuation.toString());
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Digite um nome");
    if (isNaN(Number(salary)) || Number(salary) < 0) return alert("Salário inválido");
    if (isNaN(Number(companyValuation)) || Number(companyValuation) < 0)
      return alert("Valor da empresa inválido");

    setLoading(true);
    try {
      await onSubmit({
        name: name.trim(),
        salary: Number(salary),
        companyValuation: Number(companyValuation),
      });
      onClose();
    } catch (error: any) {
      alert("Erro: " + (error?.message ?? "Erro desconhecido"));
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <h3>{title}</h3>
          <button onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </S.ModalHeader>
        <S.ModalBody>
          <label>
            Nome:
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Salário:
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </label>
          <label>
            Valor da empresa:
            <input
              type="number"
              value={companyValuation}
              onChange={(e) => setCompanyValuation(e.target.value)}
            />
          </label>
        </S.ModalBody>
        <S.ModalFooter>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </S.ModalFooter>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default UserFormModal;
