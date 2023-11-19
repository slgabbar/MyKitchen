import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RecipeBasic } from '../../app/models/recipeBasic';

export default function RecipeCard(recipe: RecipeBasic) {

    const navigate = useNavigate();

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {recipe.title}
                </Typography>
                <Typography variant="body2">
                    {recipe.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => navigate(`/recipe/${recipe.recipeKey}`)}
                    size="small">
                    View
                </Button>
            </CardActions>
        </Card>
    );
}