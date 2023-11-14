import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import { useNavigate } from 'react-router-dom';

const WofNavBar: React.FC = () => {
  const navigate = useNavigate();
  return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate('/');
            }}
          >
            <AppsIcon />
          </IconButton>

          <Box display='flex' flexGrow={1}>
            <Typography sx={{mr: 2}} variant='h6'>
              <Link href='/products' color={'inherit'}>Products</Link>
            </Typography>
            <Typography variant='h6'>
              <Link href='/example/some-long-path-variable-value' color={'inherit'}>Parameters & Props</Link>
            </Typography>
          </Box>

          <Button color="inherit" onClick={() => {
            navigate('/sign-in');
          }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
  );
};

export default WofNavBar;