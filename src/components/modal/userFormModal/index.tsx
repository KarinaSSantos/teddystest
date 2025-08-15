import React, { useState, useEffect } from "react";
import Modal from "../modalBase";
import * as S from "../modalBase/styles";
import CurrencyInput from "../CurrencyInput";

interface ClientModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    salary: number;
    companyValuation: number;
  }) => Promise<void>;
  initialData?: {
    name: string;
    salary: number;
    companyValuation: number;
  };
  loading?: boolean;
  mode?: "create" | "edit";
}

const ClientModal: React.FC<ClientModalProps> = ({
  visible,
  title,
  onClose,
  onSubmit,
  initialData,
  loading = false,
  mode = "create",
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [salary, setSalary] = useState(initialData?.salary.toString() || "");
  const [companyValuation, setCompanyValuation] = useState(
    initialData?.companyValuation.toString() || "",
  );

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSalary(initialData.salary.toString());
      setCompanyValuation(initialData.companyValuation.toString());
    } else {
      setName("");
      setSalary("");
      setCompanyValuation("");
    }
  }, [initialData, visible]);

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Digite um nome válido");

    const salaryNum = Number(salary.replace(",", "."));
    const valuationNum = Number(companyValuation.replace(",", "."));

    if (isNaN(salaryNum) || salaryNum < 0) return alert("Salário inválido");
    if (isNaN(valuationNum) || valuationNum < 0)
      return alert("Valor da empresa inválido");

    await onSubmit({
      name: name.trim(),
      salary: salaryNum,
      companyValuation: valuationNum,
    });

    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose} title={title}>
      <S.Content>
        <S.Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome"
          autoFocus
        />
        <CurrencyInput
          value={Number(salary) || 0}
          onChange={(val) => setSalary(val.toString())}
          placeholder="Digite o salário"
        />
        <CurrencyInput
          value={Number(companyValuation) || 0}
          onChange={(val) => setCompanyValuation(val.toString())}
          placeholder="Digite o valor da empresa"
        />
        <S.ConfirmButton onClick={handleSubmit} disabled={loading}>
          {loading
            ? mode === "create"
              ? "Criando..."
              : "Salvando..."
            : mode === "create"
              ? "Criar Cliente"
              : "Editar Cliente"}
        </S.ConfirmButton>
      </S.Content>
    </Modal>
  );
};

export default ClientModal;
