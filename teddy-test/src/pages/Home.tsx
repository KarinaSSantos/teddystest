import React, { useState } from "react";
import styled from "styled-components";
import { useUsers } from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 36px;
  line-height: 100%;
  letter-spacing: 0%;
`;

const Label = styled.label`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0%;
`;

const Input = styled.input`
  padding: 8px 12px;
  font-size: 18px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 10px 14px;
  border-radius: 8px;
  background: #0077ff;
  color: white;
  border: 0;
  cursor: pointer;
`;

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
        salary: 5000, // valor fictício fixo
        companyValuation: 500000, // valor fictício fixo
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
    <Container>
      <Title>Olá, seja bem-vindo!</Title>
      <div>
        <Label htmlFor="name">Digite o seu nome:</Label>
        <br />
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
        />
      </div>
      <Button onClick={handleCreate} disabled={loading}>
        {loading ? "Enviando..." : "Cadastrar"}
      </Button>
    </Container>
  );
};

export default Home;
