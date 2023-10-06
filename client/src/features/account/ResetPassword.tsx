import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from "../../app/api/agent";
import { getPasswordStrengthErrors } from '../../app/util/validationHelpers';
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const navigate = useNavigate();

    let queryParameters = new URLSearchParams(window.location.search);
    let userEmail = queryParameters.get('email');
    let confirmToken = queryParameters.get('confirmToken');

    const { register, handleSubmit, setError, watch, formState: { isSubmitting, errors } } = useForm({
        mode: 'onSubmit'
    });

    let confirmPassword = watch("password", "");

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
            if (error.includes('Password')) {
                setError('password', {message: error})
            }
            });
        }
    }

    return (
      <Container component={Paper} maxWidth="xs" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin:'auto', p: 4}}>
          <Typography component="h1" variant="h5" color={'primary.main'} sx={{fontWeight:'bold', mb:2}}>Reset Password</Typography>
            <Box component="form" onSubmit={handleSubmit(data => agent.Account.resetPassword(data)
              .then((success: boolean) => {
                  if (success) {
                      navigate('/login');
                  } else {
                      toast.error("Unexpected Error");
                  }
              })
              .catch(error => handleApiErrors(error)))}
            noValidate sx={{ mt: 1 }}>
                <input type="hidden" {...register('email')} value={userEmail!} />
                <input type="hidden" {...register('PasswordResetToken')} value={confirmToken!} />
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
              Reset Password
            </LoadingButton>
          </Box>
      </Container>
  );
}

