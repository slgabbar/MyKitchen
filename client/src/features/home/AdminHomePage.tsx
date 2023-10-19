import { Container, Typography } from "@mui/material";
import UserTable from "../admin/UserTable";

function AdminHomePage() {
    return (
        <Container>
            <UserTable></UserTable>
        </Container>
    )
}

export default AdminHomePage;