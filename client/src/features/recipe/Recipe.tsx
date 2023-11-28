import { Box, Button, Divider, Typography } from "@mui/material";
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {recipe?.title}
                </Typography>
            </Box>
            <Divider sx={{mb:2, mt:1}} />
            <Box sx={{ flexGrow: 1, mb: 2 }}>
            </Box>
        </Box>
  );
}

export default Recipe; 