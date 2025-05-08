import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAth } from "../context/Auth/AuthContext";
import { Badge, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

function Navbar() {
  const { username, isAuthenticated, logout } = useAth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AdbIcon sx={{ display: { md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                }}
              >
                TecHub
              </Typography>
            </Box>

            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={4}
              alignItems={"center"}
            >
              <IconButton aria-label="cart" onClick={handleCart}>
                <Badge badgeContent={4} color="warning">
                  <ShoppingCart sx={{ color: "white" }} />
                </Badge>
              </IconButton>
              {isAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Grid>
                        <Typography variant="h6">{username}</Typography>
                      </Grid>
                      <Grid>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar
                            alt={username || ""}
                            src="/static/images/avatar/2.jpg"
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        <a
                          href="/profile/orders"
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          My Orders
                        </a>
                      </Typography>
                    </MenuItem>

                    <MenuItem onClick={logout}>
                      <Typography sx={{ textAlign: "center" }}>
                        <button
                          onClick={handleLogout}
                          style={{
                            color: "black",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            fontSize: "16px",
                            padding: "0",
                          }}
                        >
                          Log Out
                        </button>
                      </Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <a
                    href="/auth/login"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Typography variant="h6">Login</Typography>
                  </a>
                  <a
                    href="/auth/register"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Typography variant="h6">Register</Typography>
                  </a>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
