import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./NavigationBar.styles";
import logo from "../../assets/img/logo-teddy.svg";
import hamburgerIcon from "../../assets/img/NavigationBar/menu-svgrepo-com.svg";
import homeIcon from "../../assets/img/NavigationBar/home.svg";
import usersIcon from "../../assets/img/NavigationBar/client.svg";
import selectedUsersIcon from "../../assets/img/NavigationBar/user-check.svg";
import backArrowIcon from "../../assets/img/NavigationBar/left-arrow.svg";
import { useUserContext } from "../../contexts/UserContext";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { username, selectedClients } = useUserContext();

  // Não mostrar NavigationBar na home
  if (location.pathname === "/") return null;

  const selectedCount = selectedClients.length;

  return (
    <>
      {/* Desktop NavigationBar */}
      <S.DesktopNavigationBar>
        <S.Logo src={logo} alt="Logo" />
        <S.NavigationBarItems>
          <S.NavigationBarItem onClick={() => navigate("/users")}>
            Clientes
          </S.NavigationBarItem>
          <S.NavigationBarItem onClick={() => navigate("/selected")}>
            Clientes Selecionados ({selectedCount})
          </S.NavigationBarItem>
          <S.NavigationBarItem onClick={() => navigate("/")}>
            Sair
          </S.NavigationBarItem>
        </S.NavigationBarItems>
        <S.UserGreeting>Olá, {username || "Usuário"}!</S.UserGreeting>
      </S.DesktopNavigationBar>

      {/* Mobile NavigationBar */}
      <S.MobileNavigationBar>
        <S.HamburgerButton onClick={() => setMobileOpen(true)}>
          <img src={hamburgerIcon} alt="NavigationBar" />
        </S.HamburgerButton>

        {mobileOpen && (
          <S.MobileOverlay>
            <S.MobileTop>
              <S.BackButton onClick={() => setMobileOpen(false)}>
                <img src={backArrowIcon} alt="Fechar" />
              </S.BackButton>
              <S.Logo src={logo} alt="Logo" />
            </S.MobileTop>

            <S.MobileContent>
              <S.MobileNavigationBarItem
                onClick={() => {
                  navigate("/");
                  setMobileOpen(false);
                }}
              >
                <img src={homeIcon} alt="Home" /> Home
              </S.MobileNavigationBarItem>

              <S.MobileNavigationBarItem
                onClick={() => {
                  navigate("/users");
                  setMobileOpen(false);
                }}
              >
                <img src={usersIcon} alt="Clientes" /> Clientes
              </S.MobileNavigationBarItem>

              <S.MobileNavigationBarItem
                onClick={() => {
                  navigate("/selected");
                  setMobileOpen(false);
                }}
              >
                <img src={selectedUsersIcon} alt="Clientes Selecionados" />{" "}
                Clientes Selecionados ({selectedCount})
              </S.MobileNavigationBarItem>
            </S.MobileContent>
          </S.MobileOverlay>
        )}
      </S.MobileNavigationBar>
    </>
  );
};

export default NavigationBar;
