import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { isValidEmail } from "../../app/util/validationHelpers";
import { User } from "../../app/models/user";
import { setUser } from "../account/accountSlice";

function ChangeEmail() {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const [open, setOpen] = useState(false);
    const {register, handleSubmit, setError, setValue, formState:{isSubmitting, errors}} = useForm({
        mode: 'onSubmit'
    });

    const handleClickOpen = () => {
        setValue('email', user?.email);
        setOpen(true);
    };

    const handleClose = () => { 
        setOpen(false);
    };
    
    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Email')) {
                    setError('email', {message: error})
                }
            });
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = data => 
        agent.Account.changeEmail(data)
            .then((user: User) => {
                localStorage.setItem('user', JSON.stringify(user));
                dispatch(setUser(user));

            handleClose();
        }).catch(error => handleApiErrors(error));

    return (
        <div>
            <Button sx={{textTransform:'none'}} variant="outlined" size="small" onClick={handleClickOpen}>
                Change Email
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Change Email</DialogTitle>
                <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register('userId')} value={user?.userId}></input>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            required
                            fullWidth
                            label="Email"
                            {...register('email', {
                                required: 'Email is required',
                                validate: value => isValidEmail(value) || "Not a valid email"
                            })}
                            variant="standard"
                            error={!!errors.email}
                            helperText={errors?.email?.message as string}
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

export default ChangeEmail;


