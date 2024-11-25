import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Dashboard as DashboardIcon,
  AddCircle as AddCircleIcon,
  History as HistoryIcon,
  PersonAddAlt1 as PersonAddIcon,
} from "@mui/icons-material";
import MemoryIcon from "@mui/icons-material/Memory";
import BadgeIcon from "@mui/icons-material/Badge";
import { NavLink } from "react-router-dom";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import GroupIcon from '@mui/icons-material/Group';


const drawerWidth = 240;

const activeStyle = {
  textDecoration: "none",
  color: "#4c5df3",
};

const inactiveStyle = {
  textDecoration: "none",
  color: "inherit",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openAutomoveis, setOpenAutomoveis] = useState(false);
  const [openPessoas, setOpenPessoas] = useState(false);

  const toggleAutomoveis = () => setOpenAutomoveis(!openAutomoveis);
  const togglePessoas = () => setOpenPessoas(!openPessoas);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Header */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {/* Automóveis */}
            <ListItem  onClick={toggleAutomoveis}>
              <ListItemIcon>
                <DirectionsCarIcon />
              </ListItemIcon>
              <ListItemText primary="Automóveis" />
              {openAutomoveis ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openAutomoveis} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink
                  to="/"
                  style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
                >
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                </NavLink>
                <NavLink
                  to="/register"
                  style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
                >
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <AddCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cadastro de Placas" />
                  </ListItem>
                </NavLink>
                <NavLink
                  to="/history"
                  style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
                >
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Histórico de Placas" />
                  </ListItem>
                </NavLink>
              </List>
            </Collapse>
            <Divider />

            {/* Pessoas */}
            <ListItem  onClick={togglePessoas}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Pessoas" />
              {openPessoas ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openPessoas} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink
                  to="/capture"
                  style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
                >
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Registrar Pessoas" />
                  </ListItem>
                </NavLink>
                <NavLink
                  to="/users"
                  style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
                >
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <MemoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                  </ListItem>
                </NavLink>
                <NavLink
                  to="/recognize"
                  style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
                >
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <BadgeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reconhecer Pessoas" />
                  </ListItem>
                </NavLink>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
