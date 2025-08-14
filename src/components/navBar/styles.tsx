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
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 5fr;
    height: 10vh;
    align-content: center;
  }
`;

export const HamburgerButton = styled.button`
  background: unset;
  border: none;
  cursor: pointer;
`;

export const MobileOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  flex-direction: column;
`;

export const MobileTop = styled.div`
  height: 10vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #000;
  border: none;
  cursor: pointer;
`;

export const MobileContent = styled.div`
  height: 70%;
  background-color: #f5f5f5;
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
    fill: ${({ active, theme }) => (active ? theme.colors.primary : "#0f0f0f")};
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
