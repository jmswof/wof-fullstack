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
import { Grid } from '@mui/material';

const Login: React.FC = () => {
  const {user, setUser} = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null)
      navigate('/');
  }, [user]);

  document.title = 'World of Floors - Login';
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(false);
    auth
      .signInWithEmailAndPassword(email, password)
      .then( (creds: { user: object; }) => setUser(creds.user) )
      .catch( () => setError(true) );
  }

    return (
      <Grid style={{backgroundImage: "url(/static/wood5.jpg)"}} display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh'>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          sx={{p: 5}}
          style={{
            backgroundColor: 'white',
            boxShadow: "0 2px 2px rgb(0 0 0 / 20%), 0 1px 5px rgb(0 0 0 / 20%), 0 0 0 12px rgb(255 255 255 / 40%)",
            borderRadius: "7px"
          }}
        >
          {
            error &&
            <Box sx={{mb: 3, width: '100%'}}>
              <Alert severity='error'>
                <Typography variant='body1'>Error!</Typography>
                <Typography variant='caption'>Please check your credentials.</Typography>
              </Alert>
            </Box>
          }
          <Alert sx={{mt: 0, mb: 3}} severity='info' variant='filled'>WOF 250x150px Logo</Alert>
          <Box>
            <TextField sx={{mb: 1}} onChange={(e) => setEmail(e.target.value)} type="email" name="email" variant="filled" required fullWidth label="Email Address" color='secondary' autoComplete="email" autoFocus />
            <TextField onChange={(e) => setPassword(e.target.value)} type="password" name="password" label="Password" variant="filled" required fullWidth color="secondary" autoComplete="current-password" />
          </Box>
          <Box sx={{mt: 3, width: '100%'}} alignSelf='end'>
            <Button fullWidth variant="contained" color="primary" onClick={onSubmit}>Log In</Button>
          </Box>
          <Box sx={{ mt: 3 }} alignSelf='start'>
            <Link component={LinkRouter} to='/forgot-password'>
              <Typography sx={{mt: 2}}>Forgot password?</Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
    );
};

export default Login;