import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppSelector } from '../../app/store/configureStore';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export default function AddIngredient() {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [unitValue, setUnitValue] = useState("");
    const { user } = useAppSelector(state => state.account);

    const { register, handleSubmit, setError, setValue, formState: { isSubmitting, errors } } = useForm({
        mode: 'onSubmit' 
    });

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Ingredient')) {
                    setError('ingredient', { message: error })
                } else if (error.includes('Amount')) {
                    setError('amount', { message: error })
                }
                else if (error.includes('Unit')) {
                    setError('unit', { message: error })
                }
            });
        }
    }

    const handleClickOpen = () => {
        setValue('ingredient', '');
        setValue('amount', '');
        setValue('unit', '');
        setOpen(true);
    };
      
    const handleClose = () => {
        setOpen(false);
    };

    const submit = (data: any) => {
        alert(data.ingredient)
        alert(data.amount)
        alert(data.unit)
        //handleSubmit(data => agent.Recipe.CreateRecipe(data)
        //    .then((recipeKey) => {
        //        setOpen(false);
        //        navigate(`/Recipe/${recipeKey}`);
        //    })
        //    .catch(error => handleApiErrors(error)))
    }

    const handleChange = (event: SelectChangeEvent) => {
        setValue('unit', event.target.value);
        setUnitValue(event.target.value);
    };

    return (<>
        <IconButton onClick={handleClickOpen}>
            <AddIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            <Box component="form"
                onSubmit={(data) => submit(data)}
                //onSubmit={handleSubmit(data => agent.Recipe.CreateRecipe(data)
                //.then((recipeKey) => {
                //    setOpen(false);
                //    navigate(`/Recipe/${recipeKey}`);
                //})
                //.catch(error => handleApiErrors(error)))}
            >
                <DialogTitle>Add Ingredient</DialogTitle>
                <DialogContent>
                    <input type="hidden" {...register('userKey')} value={user!.userId}></input>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                sx={{ mb: 3, mt: 1 }}
                                variant="outlined"
                                id="ingredient"
                                label="Ingredient"
                                fullWidth
                                {...register('ingredient', {
                                    required: 'Ingredient is Required'
                                })}
                                error={!!errors.ingredient}
                                helperText={errors?.ingredient?.message as string}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                required
                                sx={{ mb: 3 }}
                                variant="outlined"
                                id="amount"
                                label="Amount"
                                fullWidth
                                {...register('amount', {
                                    required: 'Amount is Required'
                                })}
                                error={!!errors.amount}
                                helperText={errors?.amount?.message as string}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl
                                fullWidth
                                required
                                error={!!errors.unit}
                                {...register('unit', {
                                    required: 'Unit is Required'
                                })}
                            >
                                <InputLabel id="unit-label">Unit</InputLabel>
                                <Select
                                    labelId="unit-label"
                                    id="unit"
                                    label="Age"
                                    value={unitValue}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"TSP"}>TSP</MenuItem>
                                    <MenuItem value={"TBSP"}>TBSP</MenuItem>
                                    <MenuItem value={"CUP"}>CUP</MenuItem>
                                </Select>
                                <FormHelperText>{errors?.unit?.message as string}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
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