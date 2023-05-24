import { Alert, AlertTitle, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useState } from "react";
import agent from "../../app/api/agent";
import { setUser } from "../account/accountSlice";


const MAX_FILE_SIZE = 2048;
const VALID_FILE_TYPES = ["image/jpeg", "image/png"]

function AvatarEdit() {

    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.account);
    const [open, setOpen] = useState(false);
    
    const [fileData, setFileData] = useState({
        file: null,
        filePreviewUrl: `data:image;base64, ${user?.profilePhotoUrl}`,
        showClearPhoto: user?.profilePhotoUrl != null,
        clearPhotoClicked: false,
        fileError: "",
    });
    
    const {handleSubmit} = useForm({
        mode: 'onSubmit'
    });

    const handleClickOpen = () => {
        setFileData({
            file: null,
            filePreviewUrl: `data:image;base64, ${user?.profilePhotoUrl}`,
            showClearPhoto: user?.profilePhotoUrl != null,
            clearPhotoClicked: false,
            fileError: "",
        })
        setOpen(true);
    };

    const handleClose = () => { 
        setOpen(false);
    };
    
    const onSubmit: SubmitHandler<FieldValues> = () => {
        let formData = new FormData();
        formData.append("formFile", fileData.file!);
        agent.ProfileSettings.avatarEdit(formData)
        .then((data) =>
        {
            dispatch(setUser(data));
            setOpen(false);
        })
        .catch((error) => console.log(error));   
    }

    function vaidateFile(file: any) {
        let error = "";
        if (!file)
            error = "Cound not find file.";
        else if (!VALID_FILE_TYPES.includes(file['type']))
            error = "Invalid file type. Please upload a file of type JPEG.";
        else if ((file['size'] / 1024) > MAX_FILE_SIZE)
            error = "File too large. Max file size is 2MB";
        setFileData({
            ...fileData,
            fileError: error
        });
        return error === "";
    }

    function handleChangeEvent(event: any) {
        if (event.target.files[0]) {
            if (vaidateFile(event.target.files[0])) {
                setFileData({
                    ...fileData,
                    file: event.target.files[0],
                    filePreviewUrl: URL.createObjectURL(event.target.files[0]),
                    showClearPhoto: true 
                });
            }
        }
    }
 
    function handleClearPhoto(event: any) {
        setFileData({
            file: null,
            filePreviewUrl: '',
            showClearPhoto: false,
            clearPhotoClicked: true,
            fileError: "",
        });
    }

    return (
        <div>
            <Button sx={{textTransform:'none'}} variant="outlined" size="small" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Edit Profile Photo</DialogTitle>
                {
                    fileData.fileError !== "" && 
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        <strong>{fileData.fileError}</strong>
                    </Alert>
                }
                <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                        <Avatar
                            alt={`${user?.firstName} ${user?.lastName}`}
                            src={fileData.filePreviewUrl}
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
                            <Button variant="text" size="small" color="error" sx={{mt:1,textTransform:'none'}} disabled={!fileData.showClearPhoto}
                                onClick={(e) => handleClearPhoto(e)}>
                                Remove current photo
                            </Button>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit" disabled={fileData.fileError !== "" ||
                            (!fileData.clearPhotoClicked && fileData.file === null)}>
                            Save
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    )
}

export default AvatarEdit;


