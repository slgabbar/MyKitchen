import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { setUser } from './accountSlice';
import agent from '../../app/api/agent';
import { User } from '../../app/models/user';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
    const {register, handleSubmit, setError, formState:{isSubmitting, errors}} = useForm({
        mode: 'onSubmit'
    });

    function handleApiErrors(errors: any) {
      if (errors) {
        errors.forEach((error: string) => {
          if (error.includes('User')) {
            setError('email', {message: error})
          } else if (error.includes('password')) {
            setError('password', {message: error})
          }
        });
      }
    }

  return (
    <Container component={Paper} maxWidth="xs" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin:'auto', p: 4}}>
          <Typography component="h1" variant="h5" color={'primary.main'} sx={{fontWeight:'bold', mb:2}}>Hi, Welcome Back!</Typography>
          <Typography variant='subtitle1'>Enter your credentials to continue</Typography>
          <Divider sx={{width:'100%', my:2}}/>
          <Box component="form" onSubmit={handleSubmit(data => agent.Account.login(data)
            .then((user: User) => {
              localStorage.setItem('user', JSON.stringify(user));
              dispatch(setUser(user));
              navigate('/');
            })
            .catch(error => handleApiErrors(error)))}
            noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              autoFocus
              {...register('email', {
                required: 'Email is required'
              })}
              error={!!errors.email}
              helperText={errors?.email?.message as string}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required'
              })}
              error={!!errors.password}
              helperText={errors?.password?.message as string}
           />
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Divider sx={{width:'100%', my:2}}/>
            <Grid container alignItems='center' justifyContent='center'>
              <Grid item>
                <Link to="/register" style={{color:'inherit',textDecoration:'none'}}>
                  {"Don't have an account?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
  );
}