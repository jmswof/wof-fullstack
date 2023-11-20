import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HouseIcon from '@mui/icons-material/House';
import AppsIcon from '@mui/icons-material/Apps';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { auth } from '../../firebase';

const WofNavBar: React.FC = () => {
  const navigate = useNavigate();
  const {user, setUser} = useAuthContext();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => navigate('/')}>
          <AppsIcon />
        </IconButton>

        <Box display='flex' flexGrow={1}>
          <Button sx={{ mr: 2 }} color="inherit" onClick={() => navigate('/products') }>Products</Button>
          <Button sx={{ mr: 2 }} color="inherit" onClick={() => navigate('/example/some-long-path-variable-value') }>Parameters & Props</Button>
        </Box>

        <IconButton size="large" color="inherit" onClick={() => navigate('/')}>
          <HouseIcon />
        </IconButton>
        <Button color="inherit" onClick={() => navigate('/tracking') }>Tracking</Button>
        <Button color="inherit" onClick={() => navigate('/reports') }>Reports</Button>
        <Button color="inherit" onClick={() => navigate('/admin') }>Admin</Button>
        <Button color="inherit" onClick={() => {
          if (user !== null) {
            auth
              .signOut()
              .then(() => {
                setUser(null);
                navigate('/sign-in');
              })
              .catch((error) => {
                console.log(error)
              });
          }
        }}>{user ? 'Logout': 'Login'}</Button>
      </Toolbar>
    </AppBar>
  );
};

export default WofNavBar;