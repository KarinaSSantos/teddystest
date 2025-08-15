import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import UsersPage from "./pages/userListPage/index";
import SelectedUsersPage from "./pages/selectedUsersPage/index";
import NavBar from "./components/navBar/index";
import { UserProvider } from "./contexts/UserContext";

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/selected" element={<SelectedUsersPage />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => (
  <UserProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </UserProvider>
);

export default App;
