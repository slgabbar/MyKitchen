import { Container, Paper } from "@mui/material";
import UserDataGrid from "../admin/UserDataGrid";

function AdminHomePage() {
    return (
        <Container>
            <Paper>
                <UserDataGrid></UserDataGrid>
            </Paper>
        </Container>
    )
}

export default AdminHomePage;