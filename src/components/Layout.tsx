import React from "react";
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
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AddCircle as AddCircleIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

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
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Header */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
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
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              <ListItem >
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
              <ListItem >
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
              <ListItem >
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Histórico de Placas" />
              </ListItem>
            </NavLink>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: 0, // Sem margem à esquerda
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
