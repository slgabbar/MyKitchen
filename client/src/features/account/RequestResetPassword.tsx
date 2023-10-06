import { LoadingButton } from '@mui/lab';
import { Box, Container, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
function RequestResetPassword() {

    let resetPasswordUrl = `${window.location.origin}/resetPassword`;

    const [submitted, setSubmitted] = useState(false);


    const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm({
        mode: 'onSubmit'
    });

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('User')) {
                    setError('email', { message: error })
                } else if (error.includes('password')) {
                    setError('password', { message: error })
                }
            });
        }
    }

    return (
        <Container component={Paper} maxWidth='sm' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', p: 4 }}>
            <Typography component="h1" variant="h5" color={'primary.main'} sx={{ fontWeight: 'bold', mb: 2 }}>Reset Password</Typography>
            {
                !submitted &&
                <>
                    <Typography variant='subtitle1' sx={{ textAlign: 'center' }}>
                        Please enter the email associated with your account. A link to reset your password will be sent to your
                        email if an account exits. If you do not have account please <Link to="/register" style={{ textDecoration: 'none', }}> { "register here" }</Link>
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(data => agent.Account.resetPasswordRequest(data)
                        .then((success: boolean) => {
                            setSubmitted(true);
                        })
                        .catch(error => handleApiErrors(error)))}
                        noValidate
                        sx={{ mt: 1 }}>
                        <input type="hidden" {...register('ResetPasswordUrl')} value={resetPasswordUrl} />
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
                        <LoadingButton
                            loading={isSubmitting}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, alignSelf: 'middle' }}>
                            Submit
                        </LoadingButton>
                    </Box>
                </>
            }
            {
                submitted && <Typography>Check your email for a rest password link.</Typography>
            }

        </Container>
    ); 
}

export default RequestResetPassword;