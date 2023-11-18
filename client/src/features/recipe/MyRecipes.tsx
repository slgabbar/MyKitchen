import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import MainLayout from '../../app/layout/MainLayout';
import CreateRecipe from './CreateRecipe';
interface BasicRecipeInfo {
    recipeKey: string;
    title: string;
     description: string;
}
export default function MyRecipes() {

    const [recipeData, setRecipeData] = useState<BasicRecipeInfo[]>([]);

    useEffect(() => {
        agent.Recipe.GetUserRecipes()
            .then(function (result) {
                let dataObjArray: BasicRecipeInfo[] = [];
                result.forEach((d: any) => {
                    dataObjArray.push({
                        recipeKey: d.recipeKey,
                        title: d.title,
                        description: d.description,
                    });
                });
                setRecipeData(dataObjArray);
            })
    }, []);

    return (
        <MainLayout>
            <Container>
                <>
                    <CreateRecipe></CreateRecipe>
                    {recipeData.map((recipe) =>
                        <Box key = {recipe.title}>
                            <Typography>
                                {recipe.title}
                                <Link to={`/Recipe/${recipe.recipeKey}`}>View</Link>
                            </Typography>
                        </Box>
                    )}
                </>
            </Container>
        </MainLayout>
    );
}