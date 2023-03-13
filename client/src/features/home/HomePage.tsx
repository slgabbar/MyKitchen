import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Header } from "../../app/layout/Header";

function HomePage() {
    return (
        <>
            <Header/>
            <Container sx={{height:'500px', bgcolor:'red'}}></Container>
            <Container sx={{height:'500px', bgcolor:'red'}}></Container>
            <Container sx={{height:'500px', bgcolor:'red'}}></Container>
            <Container sx={{height:'500px', bgcolor:'red'}}></Container>
            <Container sx={{height:'500px', bgcolor:'red'}}></Container>

        </>
    )
}

export default HomePage;