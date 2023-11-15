import Container from '@mui/material/Container';
import MainLayout from '../../app/layout/MainLayout';
import CreateRecipe from './CreateRecipe';

export default function MyRecipes() {
    return (
        <MainLayout>
            <Container>
                <CreateRecipe></CreateRecipe>
            </Container>
        </MainLayout>
    );
}