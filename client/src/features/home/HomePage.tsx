import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Header } from "../../app/layout/Header";

function HomePage() {
    return (
        <>
            <Header/>
            <Container sx={{backgroundColor: 'red',height:'600px',width: '100%'}}>
                <Typography>Test</Typography>
            </Container>
            <Container sx={{backgroundColor: 'red',height:'600px',width: '100%'}}>
                <Typography>Test</Typography>
            </Container><Container sx={{backgroundColor: 'red',height:'600px',width: '100%'}}>
                <Typography>Test</Typography>
            </Container>
        </>
    )
}

export default HomePage;