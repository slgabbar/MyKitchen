import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { User } from "../../app/models/user";
import { setUser } from "../account/accountSlice";

function ProfileEdit() {

    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.account);

    const {register, handleSubmit, setError, setValue, formState:{isSubmitting, errors}} = useForm({
        mode: 'onSubmit'
    });

    const handleClickOpen = () => {
        setValue('firstName', user?.firstName);
        setValue('lastName', user?.lastName)
        setOpen(true);
    };

    const handleClose = () => { 
        setOpen(false);
    };
    
    function handleApiErrors(errors: any) {
        if (errors) {
          errors.forEach((error: string) => {
            if (error.includes('First Name')) {
              setError('firstName', {message: error})
            } else if (error.includes('Last Name')) {
              setError('lastName', {message: error})
            }
          });
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = data => 
        agent.ProfileSettings.profileEdit(data)
        .then((user: User) => {
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(setUser(user));
            setOpen(false);
        })
        .catch(error => handleApiErrors(error));


    return (
        <div>
            <Button sx={{textTransform:'none'}} variant="outlined" size="small" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit User Information</DialogTitle>
                <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            required
                            fullWidth
                            label="First Name"
                            {...register('firstName', {
                                required: 'First name is required'
                            })}
                            variant="standard"
                            error={!!errors.firstName}
                            helperText={errors?.firstName?.message as string}
                        />
                        <TextField
                            margin="dense"
                            required
                            fullWidth
                            label="Last Name"
                            {...register('lastName', {
                                required: 'Last Name is required'
                            })}
                            variant="standard"
                            error={!!errors.lastName}
                            helperText={errors?.lastName?.message as string}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <LoadingButton loading={isSubmitting} type="submit">
                            Save
                        </LoadingButton>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    )
}

export default ProfileEdit;


