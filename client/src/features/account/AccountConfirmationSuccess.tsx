import { Container, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function AccountConfirmationSuccess() {
    return (
      <Container component={Paper} maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', p: 4 }}>
            <Typography component="h1" variant="h5" color={'primary.main'} sx={{ fontWeight: 'bold', mb: 2 }}>Account Confirmed</Typography>
            <Typography sx={{ marginBottom: 2 }} variant='subtitle1'>Thank you for verifying you email.</Typography>
            <Link to="/login">
                {"Go to Login"}
            </Link>
        </Container>
  );
}

export default AccountConfirmationSuccess;