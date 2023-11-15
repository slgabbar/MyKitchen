import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppSelector } from '../../app/store/configureStore';

export default function CreateRecipe() {

    const [open, setOpen] = useState(false);
    const { user } = useAppSelector(state => state.account);

    const { register, handleSubmit, setError, setValue, formState: { isSubmitting, errors } } = useForm({
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
        setValue('title', '');
        setValue('description', '');
        setOpen(true);
    };
      
    const handleClose = () => {
        setOpen(false);
    };

    return (<>
        <Button variant="outlined" onClick={handleClickOpen}>
            New Recipe
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <Box component="form" onSubmit={handleSubmit(data => agent.Recipe.CreateRecipe(data)
                .then(() => setOpen(false))
                .catch(error => handleApiErrors(error)))}
            >
                <DialogTitle>New Recipe</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 3 }}>
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
                        error={!!errors.title}
                        helperText={errors?.title?.message as string}
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
    </>
    );
}