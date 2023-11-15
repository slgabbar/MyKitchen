import Container from '@mui/material/Container';
import MainLayout from '../../app/layout/MainLayout';
import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Hidden, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppSelector } from '../../app/store/configureStore';

export default function MyRecipes() {

    const [open, setOpen] = useState(false);
    const { user } = useAppSelector(state => state.account);

    const { register, handleSubmit, setError, formState: { isSubmitting } } = useForm({
        mode: 'onSubmit' 
    });

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Title')) {
                    setError('title', { message: error })
                }
            });
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
      
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <MainLayout>
            <Container>
                <Button variant="outlined" onClick={handleClickOpen}>
                    New Recipe
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <Box component="form" onSubmit={handleSubmit(data => agent.Recipe.CreateRecipe(data)
                        .then(() => {
                        })
                        .catch(error => handleApiErrors(error)))}
                    >
                    <DialogTitle>New Recipe</DialogTitle>
                    <DialogContent>
                            <DialogContentText sx={{ mb:3 }}>
                                Nom nom nom! Start with a title and a description, you can edit these later.
                            </DialogContentText>
                                <input type="hidden" {...register('userKey')} value={user!.userId}></input>
                                <TextField
                                    required
                                    sx={{ mb: 3 }}
                                    variant="outlined"
                                    id="title"
                                    label="Recipe Title"
                                    fullWidth
                                    {...register('title', {
                                        required: 'Title is Required'
                                    })}
                                />
                                <TextField
                                    id="description"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    {...register('description')}
                                />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <LoadingButton loading={isSubmitting} type="submit">
                            Save
                        </LoadingButton>
                    </DialogActions>
                    </Box>
                </Dialog>
            </Container>
        </MainLayout>
    );
}