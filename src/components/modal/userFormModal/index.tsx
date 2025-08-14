import React, { useState, useEffect } from "react";
import Modal from "../modalBase";
import * as S from "../modalBase/styles";
export interface UserFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    salary: number;
    companyValuation: number;
  }) => Promise<void>;
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
    initialData?.companyValuation.toString() || "",
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSalary(initialData.salary.toString());
      setCompanyValuation(initialData.companyValuation.toString());
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Digite um nome");
    if (isNaN(Number(salary)) || Number(salary) < 0)
      return alert("Salário inválido");
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

  return (
    <Modal visible={visible} onClose={onClose} title={title}>
      <S.Content>
        <S.Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          autoFocus
        />
        <S.Input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Salário"
        />
        <S.Input
          type="number"
          value={companyValuation}
          onChange={(e) => setCompanyValuation(e.target.value)}
          placeholder="Valor da empresa"
        />
        <S.ConfirmButton onClick={handleSubmit} disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </S.ConfirmButton>
      </S.Content>
    </Modal>
  );
};

export default UserFormModal;
