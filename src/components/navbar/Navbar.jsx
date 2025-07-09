import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from "react-router-dom";

import "@fontsource/quicksand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Home', 'Products', 'About Us', 'Contact Us'];
const settings = [ 'Logout'];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
const email = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
const isLoggedIn = Boolean(token);

  const userInitial = email ? email.charAt(0).toUpperCase() : "";

 const handleLogout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userEmail");
  sessionStorage.removeItem("userToken");
  sessionStorage.removeItem("userEmail");
  navigate('/');
  // لو تريد إعادة تحميل الصفحة:
   window.location.reload();
};


  return (
    <AppBar position="static" sx={{ backgroundColor: '#2b0a3d' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* شعار الموقع */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <FontAwesomeIcon icon={faLeaf} style={{ fontSize: '32px', color: '#ffb3d1' }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                ml: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'quicksand',
                fontWeight: 700,
                fontSize: '22px',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              E-commerce
            </Typography>
          </Box>

          {/* قائمة الجوال */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open nav"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* شعار للموبايل */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              fontFamily: 'quicksand',
              fontWeight: 700,
              fontSize: '20px',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            E-commerce
          </Typography>

          {/* روابط التصفح */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              gap: 4,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  fontFamily: 'quicksand',
                  fontWeight: 600,
                  fontSize: '18px',
                  letterSpacing: '0.5px',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#ffb3d1',
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* تسجيل الدخول أو الأفاتار */}
          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: '#ffb3d1', color: '#2b0a3d' }}>
                      {userInitial}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={setting === "Logout" ? handleLogout : handleCloseUserMenu}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                sx={{
                  background: '#ffb3d1',
                  color: '#2b0a3d',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  textTransform: 'none',
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                Sign in
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
