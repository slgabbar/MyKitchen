import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
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
          if (error.includes('Username')) {
            setError('username', {message: error})
          } else if (error.includes('password')) {
            setError('password', {message: error})
          }
        });
      }
    }

  return (
      <Container component={Paper} maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(data => agent.Account.login(data)
            .then((user: User) => {
              localStorage.setItem('user', user.token);
              dispatch(setUser(user.token));
              navigate('/');
            })
            .catch(error => handleApiErrors(error)))}
            noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoFocus
              {...register('username', {
                required: 'Username is required'
              })}
              error={!!errors.username}
              helperText={errors?.username?.message as string}
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
              helperText={errors?.password
                ?.message as string}
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
            <Grid container>
              <Grid item>
                <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
  );
}