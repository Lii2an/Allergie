import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; // Importer Link

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour savoir si l'utilisateur est connecté

  // Vérification de l'état de connexion (exemple avec un token JWT dans le localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // L'utilisateur est connecté si un token est présent
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token
    setIsLoggedIn(false); // Met à jour l'état
    handleMenuClose();
    window.location.reload();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'orange' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Allergie
          </Link>
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {isLoggedIn ? (
            <>
              <MenuItem onClick={handleLogout}>
                Déconnexion
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Profil
                </Link>
              </MenuItem>
            </>
          ) : (
            <MenuItem onClick={handleMenuClose}>
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                Se connecter
              </Link>
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
