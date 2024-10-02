import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import '../Header.css';  // Import the CSS file

function Header() {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Typography variant="h6" className="header-title">United Autosports Dashboard</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
