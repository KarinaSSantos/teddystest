import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import * as S from "./Home.styles";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const { createMutation, checkUserNameExists } = useUsers(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!name.trim()) {
      alert("Digite um nome");
      return;
    }

    setLoading(true);
    try {
      const exists = await checkUserNameExists(name.trim());
      if (exists) {
        alert("Já existe um cliente com esse nome.");
        setLoading(false);
        return;
      }
      await createMutation.mutateAsync({
        name: name.trim(),
        salary: 5000,
        companyValuation: 500000,
      });
      setName("");
      navigate("/users", { state: { newClientName: name.trim() } });
    } catch (err: any) {
      alert("Erro ao criar: " + (err?.message ?? String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Title>Olá, seja bem-vindo!</S.Title>
      <div>
        <S.Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o seu nome:"
        />
        <S.Button onClick={handleCreate} disabled={loading}>
          {loading ? "Enviando..." : "Entrar"}
        </S.Button>
      </div>
    </S.Container>
  );
};

export default Home;
