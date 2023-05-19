import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { User } from "../../app/models/user";
import { setUser } from "../account/accountSlice";

function AvatarEdit() {

    const [open, setOpen] = useState(false);
    const [disableRemoveButton, setDisableRemoveButton] = useState(true);

    const [file, setFile] = useState(null);


    const {handleSubmit, formState:{isSubmitting, errors}} = useForm({
        mode: 'onSubmit'
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => { 
        setOpen(false);
    };
    
    const onSubmit: SubmitHandler<FieldValues> = () => {
        let formData = new FormData();
        formData.append("formFile", file!);
        agent.ProfileSettings.avatarEdit(formData)
        .then((data) =>
        {
            console.log(data);
        });   
    } 


    function handleChangeEvent(event: any) {
        if (event.target.files[0]) {
            setFile(event.target.files[0]);
            setDisableRemoveButton(false);
        }
        else {
            setFile(null);
            setDisableRemoveButton(true);
        }
    }

    function handleClearPhoto(event: any) {
        setFile(null);
        setDisableRemoveButton(true);
    }

    return (
        <div>
            <Button sx={{textTransform:'none'}} variant="outlined" size="small" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Edit Profile Photo</DialogTitle>
                <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                        <Avatar
                            alt="Remy Sharp"
                            src={file ? URL.createObjectURL(file!) : ""}
                            sx={{ width: 200, height: 200 }}
                        /> 
                        <Stack sx={{mt:2}}>
                            <Button variant="contained" component='label'>
                                Upload
                                <input hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={(e) => handleChangeEvent(e)} />
                            </Button>
                            <Button variant="text" size="small" color="error" sx={{mt:1,textTransform:'none'}} disabled={disableRemoveButton}
                                onClick={(e) => handleClearPhoto(e)}>
                                Remove current photo
                            </Button>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit">
                            Save
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    )
}

export default AvatarEdit;


