// src/pages/home/Home.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import * as S from "./styles";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { setUsername } = useUserContext();

  const handleCreate = () => {
    if (!name.trim()) return alert("Digite um nome");

    setUsername(name.trim());
    navigate("/users", { state: { newClientName: name.trim() } });
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
