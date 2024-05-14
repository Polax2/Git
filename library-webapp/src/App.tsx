import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import BooksPage from './Books/BooksPage';
import LoansPage from './Loans/LoansPage';

const Header = () => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#b892fc' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Christie's Corner Library
          </Typography>
          <Button color="inherit" component={Link} to="/login">
            LOGIN
          </Button>
          <Button color="inherit" component={Link} to="/collections">
            COLLECTIONS
          </Button>
          <Button color="inherit" component={Link} to="/loans">
            LOANS
          </Button>
          <Button color="inherit" component={Link} to="/about">
            ABOUT US
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/collections" element={<BooksPage />} />
        <Route path="/loans" element={<LoansPage />} />
      </Routes>
    </>
  );
};

export default Header;
