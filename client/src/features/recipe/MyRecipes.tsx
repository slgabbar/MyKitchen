import { Box, Checkbox, Container, Divider, FormControlLabel, FormGroup, Grid, Pagination, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import { RecipeBasic } from '../../app/models/recipeBasic';
import CreateRecipe from './CreateRecipe';
import RecipeCard from './RecipeCard';

export default function MyRecipes() {

    const [recipes, setRecipes] = useState<RecipeBasic[]>([]);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortedRecipes, setSortedRecipes] = useState<RecipeBasic[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(12); // Items per page

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


    useEffect(() => {
        // Apply search filter
        const filteredItems = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Apply sorting
        const sorted = filteredItems.sort((a, b) =>
            a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        );

        if (searchTerm.length > 0)
            setCurrentPage(1);

        setSortedRecipes(sorted);
    }, [searchTerm, recipes]);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedRecipes.slice(indexOfFirstItem, indexOfLastItem);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const paginate = (e: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    }

    return (
        <Box sx={{ minheight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb:1 }}>
                    My Recipes
                </Typography>
                <Divider/>
            </Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField sx={{ flex: 1, display: 'flex', justifyContent: 'center' }} onChange={handleSearch} id="myRecipeSearch" label="Search" variant="outlined" size="small" />
                <Pagination color='primary' page={currentPage} sx={{ flex: 1, display: 'flex', justifyContent: 'center' }} count={Math.ceil(sortedRecipes.length / itemsPerPage)} onChange={(e, page) => paginate(e, page)} />
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <CreateRecipe />
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1, mb: 2 }}>
                {
                    sortedRecipes.length === 0 && <Typography variant="subtitle2" sx={{ mt:3, textAlign: 'center' }}>No Results</Typography>
                }
                <Grid container spacing={2}>
                    {
                        currentItems.map(recipe =>
                            <Grid key={recipe.recipeKey} item xs={3}>
                                <RecipeCard
                                    recipeKey={recipe.recipeKey}
                                    title={recipe.title}
                                    description={recipe.description}
                                />
                            </Grid>)
                    }
                </Grid>
            </Box>
        </Box>
    );
}