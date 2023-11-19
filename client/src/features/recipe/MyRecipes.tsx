import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import { RecipeBasic } from '../../app/models/recipeBasic';
import CreateRecipe from './CreateRecipe';
import RecipeCard from './RecipeCard';

export default function MyRecipes() {

    const [recipes, setRecipes] = useState<RecipeBasic[]>([]);

    useEffect(() => {
        agent.Recipe.GetUserRecipes()
            .then(function (result) {
                let dataObjArray: RecipeBasic[] = [];
                result.forEach((d: any) => {
                    dataObjArray.push({
                        recipeKey: d.recipeKey,
                        title: d.title,
                        description: d.description,
                    });
                });
                setRecipes(dataObjArray);
            })
    }, []);

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Container>
                    <Typography variant="h4">
                        My Recipes
                    </Typography>
                    <CreateRecipe></CreateRecipe>
                    <Grid container spacing={2}>
                        {
                            recipes.map(recipe =>
                                <Grid key={recipe.recipeKey} item xs={4}>
                                    <RecipeCard
                                        recipeKey={recipe.recipeKey}
                                        title={recipe.title}
                                        description={recipe.description}
                                    />
                                </Grid>)
                        }
                    </Grid>
                </Container>
            </Box>
        </>
    );
}