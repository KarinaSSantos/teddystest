import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import UsersPage from "./pages/userListPage/UsersPage";
import SelectedUsersPage from "./pages/selectedUsersPage/SelectedUsersPage";
import NavigationBar from "./components/navigationBar/NavigationBar";
import { UserProvider } from "./contexts/UserContext";

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <NavigationBar />}

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
