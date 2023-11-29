import { Box, Button, Card, Divider, Typography } from "@mui/material";
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
        <Box sx={{ minheight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box>
                <Button color="secondary" onClick={() => navigate('/myRecipes') } startIcon={<ArrowBackIcon />} sx={{ textTransform: "none" }}>
                    Back to My Recipes
                </Button>
            </Box>
            <Box sx={{ mb:2, alignSelf: 'center' }}>
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
        </Box>
    );
}

export default Recipe; 