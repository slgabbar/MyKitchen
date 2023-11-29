import { Box, Button, Card, Container, Divider, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface RecipeDto {
    recipeKey: string;
    title: string;
    description: string;
}

function Recipe() {

    const [recipe, setRecipe] = useState<RecipeDto |null>(null);
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        agent.Recipe.GetRecipe(id!)
            .then(function (result) {
                setRecipe(result);
            })
    }, [id]);

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box>
                <Button color="secondary" onClick={() => navigate('/myRecipes') } startIcon={<ArrowBackIcon />} sx={{ textTransform: "none" }}>
                    Back to My Recipes
                </Button>
            </Box>
            <Container sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {recipe?.title}
                    </Typography>
                </Box>
                <Box sx={{ mb: 2, alignSelf: 'center' }}>
                    <Typography>
                        {recipe?.description}
                    </Typography>
                </Box>
                <Box display='flex' sx={{ justifyContent: 'center' }}>
                    <Card variant="outlined" sx={{ px:2, display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ m: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="overline">Yields:</Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>--</Typography>
                        </Box>
                        <Divider sx={{ mx: 2 }} orientation="vertical" variant="middle" flexItem />
                        <Box sx={{ m: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="overline">Prep Time:</Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>--</Typography>
                        </Box>
                        <Divider sx={{ mx: 2 }} orientation="vertical" variant="middle" flexItem />
                        <Box sx={{ m: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="overline">Cook Time:</Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>--</Typography>
                        </Box>
                        <Divider sx={{ mx: 2 }} orientation="vertical" variant="middle" flexItem />
                        <Box sx={{ m: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="overline">Total Time:</Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>--</Typography>
                        </Box>
                    </Card>
                </Box>
                <Grid container spacing={2} sx={{ mt: 1, flex: 1 }}>
                    <Grid item lg={4} md={6} xs={12}>
                        <Box sx={{ border: 1, borderRadius: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ my: 1, alignSelf: 'center' }}>
                                <Typography variant="h6" sx={{ textDecoration: 'underline' }}>Ingredients</Typography>
                            </Box>
                            <Box>
                                <ul>
                                    <li>2 Cups Flour</li>
                                    <li>1 Cup Sugar</li>
                                    <li>1 Tbsp Brown Sugar</li>
                                    <li>7 Tsp Salt</li>
                                </ul>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item lg={8} md={6} xs={12}>
                        <Box sx={{ border: 1, borderRadius: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ my: 1, alignSelf: 'center' }}>
                                <Typography variant="h6" sx={{ textDecoration: 'underline' }}>Directions</Typography>
                            </Box>
                            <ol>
                                <li>
                                    Trim about 1/8 inch from the bottom of each pepper so it can stand upright.
                                    Cut the top 1/4 inch off each pepper. Remove and discard the stems, then finely
                                    chop the remaining flesh from the tops and set aside. Scoop out and discard the
                                    seeds and as much of the membranes as you can from inside the peppers.
                                </li>
                                <li>
                                    Trim about 1/8 inch from the bottom of each pepper so it can stand upright.
                                    Cut the top 1/4 inch off each pepper. Remove and discard the stems, then finely
                                    chop the remaining flesh from the tops and set aside. Scoop out and discard the
                                    seeds and as much of the membranes as you can from inside the peppers.
                                </li>
                            </ol>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Recipe; 