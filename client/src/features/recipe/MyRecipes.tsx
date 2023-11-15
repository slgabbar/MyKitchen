import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import MainLayout from '../../app/layout/MainLayout';
import CreateRecipe from './CreateRecipe';


interface BasicRecipeInfo {
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
                    {recipeData.map((recipe) => <Typography key={recipe.title}>{recipe.title}</Typography>)}
                </>
            </Container>
        </MainLayout>
    );
}