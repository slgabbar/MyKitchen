import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from "../../app/api/agent";
import { getPasswordStrengthErrors, isValidEmail } from '../../app/util/validationHelpers';
import { User } from '../../app/models/user';
import { useAppDispatch } from '../../app/store/configureStore';
import { setUser } from '../../features/account/accountSlice'

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit, setError, watch, formState:{isSubmitting, errors}} = useForm({
    mode: 'onSubmit'
  });

  let confirmPassword = watch("password", "");

  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes('Password')) {
          setError('password', {message: error})
        } else if (error.includes('Email')) {
          setError('email', {message: error})
        }
      });
    }
  }

  return (
      <Container component={Paper} maxWidth="xs" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin:'auto', p: 4}}>
          <Typography component="h1" variant="h5" sx={{fontWeight:'bold', mb:4}}>REACT</Typography>
          <Typography component="h1" variant="h5" color={'primary.main'} sx={{fontWeight:'bold', mb:2}}>Sign Up</Typography>
          <Typography variant='subtitle1'>Enter your credentials to continue</Typography>
          <Divider sx={{width:'100%', my:2}}/>
          <Box component="form" onSubmit={handleSubmit(data => agent.Account.register(data)
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
              required
              fullWidth
              label="Email"
              autoFocus
              {...register('email', {
                required: 'Email is required',
                validate: value => isValidEmail(value) || "Not a valid email"
              })}
              error={!!errors.email}
              helperText={errors?.email?.message as string}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                validate: value => getPasswordStrengthErrors(value)
              })}
              error={!!errors.password}
              helperText={errors?.password
                ?.message as string}
           />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              {...register('confirmPassword', {
                validate: value =>
                  value === confirmPassword || "Password does not match"
              })}
              error={!!errors.confirmPassword}
              helperText={errors?.confirmPassword
                ?.message as string}
           />
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </LoadingButton>
            <Divider sx={{width:'100%', my:2}}/>
            <Grid container alignItems='center' justifyContent='center'>
              <Grid item>
                <Link to="/login" style={{color:'inherit',textDecoration:'none'}}>
                  {"Already have an account?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
  );
}

