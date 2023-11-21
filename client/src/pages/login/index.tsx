import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { SyntheticEvent, useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useAuthContext } from '../../context/AuthContext';
import Link from '@mui/material/Link';
import { useNavigate, Link as LinkRouter } from 'react-router-dom';

const Login: React.FC = () => {
  const {user, setUser} = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  }, [user]);

  document.title = 'World of Floors - Login';
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(creds => {
        setUser(creds.user);
      })
      .catch(err => {
        console.log(err);
      });
  }

    return (
      <Box style={{backgroundImage: "url(/static/wood5.jpg)"}} height={'100vh'}>
        <Box display={'flex'} justifyContent={'center'}>
          <Typography sx={{mt: 2}} variant='h3' gutterBottom>WOF Firebase Auth</Typography>
        </Box>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Box sx={{p: 5}} style={{backgroundColor: 'white', boxShadow: "0 2px 2px rgb(0 0 0 / 20%), 0 1px 5px rgb(0 0 0 / 20%), 0 0 0 12px rgb(255 255 255 / 40%)", borderRadius: "0px"}}>
            {error && <Alert severity="error" sx={{mb: 2}}>Error!</Alert>}
            <Box>
              <TextField sx={{mb: 1}} onChange={(e) => setEmail(e.target.value)} type="email" name="email" variant="filled" required fullWidth label="Email Address" color='secondary' autoComplete="email" autoFocus />
              <TextField onChange={(e) => setPassword(e.target.value)} type="password" name="password" label="Password" variant="filled" required fullWidth color="secondary" autoComplete="current-password" />
            </Box>
            <Box>
              <Button sx={{mt: 3}} fullWidth variant="contained" color="primary" onClick={onSubmit}>Log In</Button>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Link component={LinkRouter} to='/forgot-password'>
                <Typography sx={{mt: 2}}>Forgot password?</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    );
};

export default Login;