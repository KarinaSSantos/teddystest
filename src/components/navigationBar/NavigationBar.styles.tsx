import styled from "styled-components";

export const DesktopNavigationBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 70px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Logo = styled.img`
  height: 40px;
`;

export const NavigationBarItems = styled.div`
  display: flex;
  gap: 2rem;
`;

export const NavigationBarItem = styled.div`
  cursor: pointer;
  font-weight: 500;
`;

export const UserGreeting = styled.div`
  font-weight: 600;
`;

export const MobileNavigationBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const HamburgerButton = styled.button`
  background: none;
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
  height: 30%;
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
  background-color: #fff;
  border: none;
  cursor: pointer;
`;

export const MobileContent = styled.div`
  height: 70%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  gap: 1.5rem;
`;

export const MobileNavigationBarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
`;
