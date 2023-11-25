import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../context/AuthContext';

const Home: React.FC = () => {
  document.title = 'World of Floors - Home';
  const {user} = useAuthContext();

  return (
    <Container
      component={Paper}
      sx={{
        my:5,
        p: 5,
        height: '80vh',
        backgroundImage: 'url(/static/WorldOfFloors.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
        }}
      >
      <Typography variant='h5'>Welcome, {user['multiFactor'].user.email}</Typography>
    </Container>
  );
};

export default Home;