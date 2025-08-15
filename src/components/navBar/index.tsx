import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./styles";
import { useUserContext } from "../../contexts/UserContext";

import { ReactComponent as HomeIcon } from "../../assets/img/NavBar/home.svg";
import { ReactComponent as UsersIcon } from "../../assets/img/NavBar/client.svg";
import { ReactComponent as SelectedUsersIcon } from "../../assets/img/NavBar/user-check.svg";
import { ReactComponent as HamburgerIcon } from "../../assets/img/NavBar/menu-svgrepo-com.svg";
import { ReactComponent as BackArrowIcon } from "../../assets/img/NavBar/left-arrow.svg";

import Logo from "../../assets/img/logo-teddy.svg";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const { username, selectedClients } = useUserContext();

  if (location.pathname === "/") return null;

  const selectedCount = selectedClients.length;

  const getColor = (path: string) =>
    location.pathname === path ? "#fff" : "#0f0f0f";

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
      setClosing(false);
    }, 400);
  };

  return (
    <>
      <S.DesktopNavBar>
        <S.Logo src={Logo} alt="Logo" />
        <S.NavBarItems>
          <S.NavBarItem
            active={location.pathname === "/users"}
            onClick={() => navigate("/users")}
          >
            Clientes
          </S.NavBarItem>
          <S.NavBarItem
            active={location.pathname === "/selected"}
            onClick={() => navigate("/selected")}
          >
            Clientes Selecionados ({selectedCount})
          </S.NavBarItem>
          <S.NavBarItem
            active={location.pathname === "/"}
            onClick={() => navigate("/")}
          >
            Sair
          </S.NavBarItem>
        </S.NavBarItems>
        <S.UserGreeting>Olá, {username || "Usuário"}!</S.UserGreeting>
      </S.DesktopNavBar>

      <S.MobileNavBar>
        <S.HamburgerButton onClick={() => setMobileOpen(true)}>
          <HamburgerIcon fill="#0f0f0f" />
        </S.HamburgerButton>
        <S.MobileLogoTop src={Logo} alt="Logo" />

        {(mobileOpen || closing) && (
          <S.MobileContentWrapper $isOpen={mobileOpen} $closing={closing}>
            <S.MobileTop>
              <S.MobileLogo src={Logo} alt="Logo" />
            </S.MobileTop>

            <S.BackButton onClick={handleClose}>
              <BackArrowIcon fill="#fff" />
            </S.BackButton>

            <S.MobileContent>
              <S.MobileNavBarItem
                active={location.pathname === "/"}
                onClick={() => {
                  navigate("/");
                  handleClose();
                }}
              >
                <HomeIcon fill={getColor("/")} />
                Home
              </S.MobileNavBarItem>

              <S.MobileNavBarItem
                active={location.pathname === "/users"}
                onClick={() => {
                  navigate("/users");
                  handleClose();
                }}
              >
                <UsersIcon fill={getColor("/users")} />
                Clientes
              </S.MobileNavBarItem>

              <S.MobileNavBarItem
                active={location.pathname === "/selected"}
                onClick={() => {
                  navigate("/selected");
                  handleClose();
                }}
              >
                <SelectedUsersIcon fill={getColor("/selected")} />
                Clientes Selecionados ({selectedCount})
              </S.MobileNavBarItem>
            </S.MobileContent>
          </S.MobileContentWrapper>
        )}
      </S.MobileNavBar>
    </>
  );
};

export default NavBar;
