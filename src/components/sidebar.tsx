import React from "react";
import styled from "styled-components";
import { FaTachometerAlt, FaPlusCircle, FaHistory } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: fixed;
`;

const Logo = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.5em;
  color: #4c5df3;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1em;
  color: #333;

  a {
    display: flex;
    align-items: center;
    gap: 15px;
    color: inherit;
    text-decoration: none;

    &.active {
      color: #4c5df3;
      font-weight: bold;
    }

    &:hover {
      color: #4c5df3;
    }
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <Logo>Dashboard</Logo>
      <Menu>
        <MenuItem>
          <NavLink to="/" end>
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/register">
            <FaPlusCircle /> Cadastro de Placas
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/history">
            <FaHistory /> Histórico de Placas
          </NavLink>
        </MenuItem>

          <MenuItem>
          <NavLink to="/capture">
            <FaHistory /> Registrar Faces
          </NavLink>
        </MenuItem>

          <MenuItem>
          <NavLink to="/train">
            <FaHistory /> Treinar Modelos
          </NavLink>
        </MenuItem>

          <MenuItem>
          <NavLink to="/recognize">
            <FaHistory /> Reconhecer pessoas
          </NavLink>
        </MenuItem>
      </Menu>
    </SidebarContainer>
  );
};


export default Sidebar;
