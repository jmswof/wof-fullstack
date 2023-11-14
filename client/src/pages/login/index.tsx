import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { SyntheticEvent, useState } from 'react';

const Login: React.FC = () => {
    document.title = 'Demo - Example Login';
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>();

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        let response = await fetch('http://localhost:8080/sign-in', {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + btoa(`${email}:${password}`)
          },
          referrerPolicy: 'no-referrer',
          body: JSON.stringify({
            message: 'A simple and basic login request'
          }),
        });
        response = await response.json();
        setError(!response['success']);
    }

    return (
      <>
        <Box display={'flex'} justifyContent={'center'}>
          <Typography sx={{mt: 2}} variant='h3' gutterBottom>Basic Auth</Typography>
        </Box>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <form style={{padding: '1em', boxShadow: "0 2px 2px rgb(0 0 0 / 20%), 0 1px 5px rgb(0 0 0 / 20%), 0 0 0 12px rgb(255 255 255 / 40%)", borderRadius: "0px"}}>
            {error && <Alert severity="error" sx={{mb: 2}}>Error!</Alert>}
            <div>
              <TextField sx={{mb: 1}} onChange={(e) => setEmail(e.target.value)} type="email" name="email" variant="filled" required fullWidth label="Email Address" color='secondary' autoComplete="email" autoFocus />
              <TextField onChange={(e) => setPassword(e.target.value)} type="password" name="password" label="Password" variant="filled" required fullWidth color="secondary" autoComplete="current-password" />
            </div>
            <Button sx={{mt: 3}} type="submit" fullWidth variant="contained" color="primary" onClick={onSubmit}>Log In</Button>
          </form>
        </Box>
      </>
    );
};

export default Login;