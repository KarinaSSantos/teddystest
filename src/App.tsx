import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import UsersPage from "./pages/UsersPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div
        style={{
          padding: 12,
          borderBottom: "1px solid #eee",
          marginBottom: 12,
        }}
      >
        <Link to="/" style={{ marginRight: 12 }}>
          Home
        </Link>
        <Link to="/users">Usuários</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
