import LoginPage from './Login/LoginPage';
import BooksPage from './Books/BooksPage';
import { Box } from '@mui/material';

function App() {
  return (
    <Box
    // sx={{
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignContent: 'center',
    //   mt: '20%',
    // }}
    >
      {<BooksPage />}
    </Box>
  );
  // return <div className="App">{<LoginPage />}</div>;
}

export default App;
