import { Container, Paper, Typography } from '@mui/material';
function AccountConfirmationError() {
    return (
        <Container component={Paper} maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', p: 4 }}>
            <Typography component="h1" variant="h5" color={'error.main'} sx={{ fontWeight: 'bold', mb: 2 }}>Uh Oh!</Typography>
            <Typography sx={{ marginBottom: 2 }} variant='subtitle1'>Something went wrong.</Typography>
        </Container>
    );
}

export default AccountConfirmationError;

