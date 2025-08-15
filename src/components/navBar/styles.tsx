import styled from "styled-components";

export const DesktopNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 100px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  position: fixed;
  width: 100%;
  top: 0;
  box-shadow: 0px 2px 2px 0px #0000001a;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Logo = styled.img`
  height: 48px;
`;

export const NavBarItems = styled.div`
  display: flex;
  gap: 2rem;
`;

export const NavBarItem = styled.div<{ active?: boolean }>`
  cursor: pointer;
  font-weight: 500;
  color: ${({ active, theme }) => (active ? theme.colors.primary : "inherit")};
  border-bottom: ${({ active, theme }) =>
    active ? `1px solid ${theme.colors.primary}` : "transparent"};
  padding-bottom: 2px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const UserGreeting = styled.div`
  font-weight: 600;
`;

export const MobileNavBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    height: 10vh;
    background-color: #fff;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }
`;

export const HamburgerButton = styled.button`
  background: unset;
  border: none;
  cursor: pointer;
`;

export const MobileLogoTop = styled.img`
  height: 40px;
  margin: 0 auto;
`;

export const MobileContentWrapper = styled.div<{
  $isOpen: boolean;
  $closing: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  transform: ${({ $isOpen, $closing }) =>
    $isOpen && !$closing
      ? "translateX(0)"
      : $closing
        ? "translateX(-100%)"
        : "translateX(100%)"};
  transition: transform 0.4s ease;
`;

export const MobileTop = styled.div`
  height: 20vh;
  background-color: #363636;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MobileLogo = styled.img`
  height: 60px;
`;

export const BackButton = styled.button`
  position: absolute;
  top: 18vh;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #000;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  svg {
    max-width: 60%;
    max-height: 60%;
    height: auto;
    width: auto;
  }
`;

export const MobileContent = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 3rem 2rem;
  gap: 1.5rem;
`;

export const MobileNavBarItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.font.familynavbar};
  cursor: pointer;
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.navmobile};
  padding-bottom: 2px;
  font-weight: 600;

  svg,
  img {
    height: 20px;
    width: 20px;
    fill: ${({ active }) => (active ? "#fff" : "#0f0f0f")};
    transition: fill 0.2s ease-in-out;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};

    svg,
    img {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;
