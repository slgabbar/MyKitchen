import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RecipeBasic } from '../../app/models/recipeBasic';

export default function RecipeCard(recipe: RecipeBasic) {

    const navigate = useNavigate();

    const description = recipe.description?.length > 50
        ? recipe.description.substring(0, 125) + '...'
        : recipe.description;

    return (
        <Card raised={false} elevation={0} sx={{ border: 1 }}>
            <CardContent>
                <Typography component="div" noWrap sx={{ fontWeight: 'bold' }}>{recipe.title}</Typography>
                <Typography variant="body2" color="text.secondary">{description}</Typography>
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