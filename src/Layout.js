import { DarkMode, LightMode } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Paper,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  useTheme,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { Link, Outlet, useMatch } from "react-router-dom";

const StyledLink = ({ children, active, to }) => {
  return (
    <Button
      color="inherit"
      LinkComponent={Link}
      to={to}
      sx={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: 16,
        position: "relative",
      }}
    >
      {active && (
        <Fragment>
          <Box
            sx={{
              backgroundColor: "error.main",
              position: "absolute",
              top: 0,
              left: 0,
              height: 4,
              width: "40%",
            }}
          />
          <Box
            sx={{
              backgroundColor: "error.main",
              position: "absolute",
              bottom: 0,
              right: 0,
              height: 4,
              width: "40%",
            }}
          />
        </Fragment>
      )}
      {children}
    </Button>
  );
};

function ModeSwitch({ isLightmode, toggleMode }) {
  const theme = useTheme();
  return (
    <Checkbox
      icon={<DarkMode htmlColor="#fff" />}
      checkedIcon={<LightMode color="warning" />}
      checked={theme.palette.mode === "dark"}
      onClick={(event) => {
        toggleMode(!isLightmode);
      }}
    />
  );
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function Layout() {
  const isAddPath = useMatch("/add");
  const [isLightmode, toggleMode] = useState(true);

  return (
    <ThemeProvider theme={isLightmode ? lightTheme : darkTheme}>
      <Paper elevation={0} sx={{ height: "100vh" }}>
        <AppBar color="primary" elevation={1}>
          <Toolbar variant="dense" sx={{ alignItems: "center" }}>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  p: 0,
                  m: 0,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  borderTop: 10,
                  borderBottom: 10,
                  textDecoration: "none",
                  borderColor: "error.main",
                }}
              >
                Z-I-M-S
              </Typography>

              <Stack direction="row" spacing={2}>
                <StyledLink active={!isAddPath} to="/">
                  View All Products
                </StyledLink>
                <StyledLink active={isAddPath} to={"/add"}>
                  Add New Product
                </StyledLink>
              </Stack>
              <ModeSwitch {...{ isLightmode, toggleMode }} />
            </Stack>
          </Toolbar>
        </AppBar>
        <Toolbar />

        <Outlet />
      </Paper>
    </ThemeProvider>
  );
}

export default Layout;
