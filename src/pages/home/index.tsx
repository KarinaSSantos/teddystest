import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { useUsers } from "../../hooks/useUsers";
import * as S from "./styles";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { setUsername } = useUserContext();
  const { createMutation } = useUsers(1, 16);

  const handleCreate = async () => {
    if (!name.trim()) return alert("Digite um nome");

    try {
      await createMutation.mutateAsync({
        name: name.trim(),
        salary: 0,
        companyValuation: 0,
      });
      setUsername(name.trim());
      navigate("/users");
    } catch (err: any) {
      alert("Erro ao criar usuário: " + (err?.message ?? "Erro desconhecido"));
    }
  };

  return (
    <S.Container>
      <S.Title>Olá, seja bem-vindo!</S.Title>
      <S.Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite o seu nome:"
      />
      <S.Button onClick={handleCreate}>Entrar</S.Button>
    </S.Container>
  );
};

export default Home;
