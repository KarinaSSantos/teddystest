# TeddyTest - Aplicação React + TypeScript + Vite

**Autor:** Karina Gonçalves dos Santos  
**LinkedIn:** [Karina Gonçalves](https://www.linkedin.com/in/karina-g-dos-santos-705b2555/)  
**GitHub:** [KarinaSSantos/teddystest](https://github.com/KarinaSSantos/teddystest)

---

## 📌 Descrição do Projeto

TeddyTest é uma aplicação web desenvolvida com **React + TypeScript + Vite**, que gerencia clientes de forma prática e responsiva. O projeto contém as seguintes páginas:

- **Home:** o usuário insere um nome que é automaticamente cadastrado.  
- **Lista de Clientes:** exibe todos os clientes cadastrados, incluindo nome, valor de salário e valor da empresa. Possui funcionalidades para:
  - Criar, editar e excluir clientes  
  - Selecionar clientes para contabilização  
  - Filtrar por valores, ordenar por nome (asc/desc), salário e empresa  
  - Barra de pesquisa por nome ou ID  
- **Clientes Selecionados:** mostra os clientes previamente selecionados na lista.

O projeto utiliza **React Context** para compartilhamento de informações entre as páginas e componentes.

---

## 🎨 Design System

O design system da aplicação foi construído com foco em **microcomponentes reutilizáveis**, **mobile-first** e **medidas relativas** (como `rem` e `%`) para garantir melhor responsividade.  
Foram utilizados **themes** para cores, tipografia e espaçamentos consistentes, garantindo padronização visual em todos os componentes.

---

## 🧑‍💻 Padrões de Código

- **Clean Code:** funções pequenas, componentes claros e legíveis.  
- **Arquitetura de Pastas:** separação de **components**, **pages**, **contexts**, **hooks**, **styles**, **types**, **assets** e **api**.  
- **Axios:** para requisições HTTP de forma organizada, centralizando chamadas em `/api`.  
- **TypeScript:** tipagem completa para maior segurança e manutenção do código.

---
## 📁 Estrutura do Projeto

```text
src/
├── components/        # Componentes reutilizáveis
├── pages/             # Páginas da aplicação
├── contexts/          # Contextos para gerenciamento de estado
├── hooks/             # Hooks personalizados
├── styles/            # Arquivos de estilo (CSS/SCSS)
├── types/             # Tipos TypeScript
├── assets/            # Imagens, ícones e outros recursos
├── api/               # Configurações e chamadas de API
├── vite.config.ts     # Configuração do Vite
├── package.json       # Dependências e scripts do projeto
├── Dockerfile         # Dockerfile para produção
└── docker-compose.yml # Docker Compose para desenvolvimento e produção

---

## ⚙️ Requisitos

- **Node.js** >= 20  
- **npm** ou **yarn**  
- **Docker** e **Docker Compose** (opcional, para rodar em container)  

---

## 🚀 Instalação e Execução

### 1. Rodando localmente

```bash
# Clonar o repositório
git clone https://github.com/KarinaSSantos/teddystest.git
cd teddystest

# Instalar dependências
npm install
# ou
yarn install

# Rodar em modo desenvolvimento
npm run dev
# ou
yarn dev


### 2. Rodando com Docker

#### Desenvolvimento (hot reload)

```bash
docker-compose up dev


#### Build sem rodar
```bash
docker-compose build

#### Produção
```bash
docker-compose up prod


---

### 🔧 Tecnologias Utilizadas

- React 19  
- TypeScript  
- Vite  
- Axios  
- React Context  
- Docker & Docker Compose  
- Nginx (para produção)  

---

### 🌟 Funcionalidades Extras

- Filtros por nome, salário e empresa  
- Ordenação ascendente/descendente  
- Seleção de clientes para contabilização  
- SPA totalmente responsiva  
- Hot reload no desenvolvimento via Docker  

---

### 📬 Contato

**Autor:** Karina Gonçalves dos Santos  
**LinkedIn:** [Karina Gonçalves](https://www.linkedin.com/in/karina-g-dos-santos-705b2555/)  
**GitHub:** [KarinaSSantos/teddystest](https://github.com/KarinaSSantos/teddystest)
