import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from "../../app/api/agent";
import { isValidEmail } from '../../app/util/validationHelpers';

export default function Register() {
  const {register, handleSubmit, setError, watch, formState:{isSubmitting, errors}} = useForm({
    mode: 'onSubmit'
  });

  let confirmPassword = watch("password", "");

  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        // should make password errors on the client for pw
        if (error.includes('Password')) {
          setError('password', {message: error})
        } else if (error.includes('Email')) {
          setError('email', {message: error})
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit(data => agent.Account.register(data)
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
                required: 'Password is required'
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
            <Grid container>
              <Grid item>
                <Link to="/login">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
  );
}

