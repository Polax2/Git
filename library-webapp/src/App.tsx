import LoginPage from './Login/LoginPage';
import BooksPage from './Books/BooksPage';
import {
  styled,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#f0f0f0',
  color: '#333',
  boxShadow: 'none',
  borderBottom: '1px solid #ccc',
}));

function App() {
  return (
    <Box>
      <Header position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Christie's Corner Library
          </Typography>
          <Button color="inherit" sx={{ mr: 2 }}>
            LOGIN
          </Button>
          <Button color="inherit" sx={{ mr: 2 }}>
            COLLECTIONS
          </Button>
          <Button color="inherit" sx={{ mr: 2 }}>
            LOANS
          </Button>
          <Button color="inherit" sx={{ mr: 2 }}>
            ABOUT US
          </Button>
        </Toolbar>
      </Header>
      <BooksPage />
    </Box>
  );
}

export default App;
