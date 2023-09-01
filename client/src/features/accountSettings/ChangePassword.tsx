import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { useAppSelector } from "../../app/store/configureStore";
import { getPasswordStrengthErrors } from "../../app/util/validationHelpers";

function ChangePassword() {

    const { user } = useAppSelector(state => state.account);
    
    const [open, setOpen] = useState(false);

    const {register, handleSubmit, setError, setValue, watch, formState:{isSubmitting, errors}} = useForm({
        mode: 'onSubmit'
    });

    let confirmPassword = watch("newPassword", "");

    const handleClickOpen = () => {
        setValue('currentPassword', "");
        setValue('newPassword', "")
        setValue('confirmPassword', "")
        setOpen(true);
    };

    const handleClose = () => { 
        setOpen(false);
    };
    
    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Incorrect password')) {
                    setError('currentPassword', {message: error})
                } else {
                    setError('newPassword', {message: error})
                }
            });
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = data => 
        agent.Account.changePassword(data)
        .then((result: boolean) => {
            handleClose();
        }).catch(error => handleApiErrors(error));

    return (
        <div>
            <Button sx={{textTransform:'none'}} variant="outlined" size="small" onClick={handleClickOpen}>
                Change Password
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change Password</DialogTitle>
                <Box component='form' onSubmit={handleSubmit(onSubmit)}>

                    <input type="hidden" {...register('userId')} value={user?.userId}></input>

                    <DialogContent>
                        <TextField
                            margin="dense"
                            required
                            fullWidth
                            label="Current Password"
                            {...register('currentPassword', {
                                required: 'Password is required'
                            })}
                            variant="standard"
                            type="password"
                            error={!!errors.currentPassword}
                            helperText={errors?.currentPassword?.message as string}
                        />
                        <TextField
                            margin="dense"
                            required
                            fullWidth
                            label="New Password"
                            type="password"
                            {...register('newPassword', {
                                required: 'Password is required',
                                validate: value => getPasswordStrengthErrors(value)
                            })}
                            error={!!errors.newPassword}
                            variant="standard"
                            helperText={errors?.newPassword?.message as string}
                        />
                        <TextField
                            margin="dense"
                            required
                            fullWidth
                            label="New Password Confirmed"
                            type="password"
                            {...register('confirmPassword', {
                                validate: value =>
                                    value === confirmPassword || "Password does not match"
                            })}
                            error={!!errors.confirmPassword}
                            variant="standard"
                            helperText={errors?.confirmPassword?.message as string}
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

export default ChangePassword;


