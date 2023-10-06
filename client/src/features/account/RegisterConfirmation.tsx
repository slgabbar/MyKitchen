import { Container, Paper, Typography } from '@mui/material';
function RegisterConfirmation() {
    return (
        <Container component={Paper} maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', p: 4 }}>
            <Typography component="h1" variant="h5" color={'primary.main'} sx={{ fontWeight: 'bold', mb: 2 }}>Almost There!</Typography>
            <Typography variant='subtitle1'>Check your email to confirm your account.</Typography>
        </Container>
    );
}

export default RegisterConfirmation;