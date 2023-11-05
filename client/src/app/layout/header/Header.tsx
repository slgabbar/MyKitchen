import { AppBar, Box, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import ProfileDropdown from "./ProfileDrowdown";
import { useNavigate } from "react-router-dom";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAppDispatch } from "../../store/configureStore";
import { toggleTheme } from "../../../features/account/accountSlice";
import RestaurantIcon from '@mui/icons-material/Restaurant';

function Header() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return (
        <Box sx={{ width: '100%' }}>
            <AppBar position="static" color="default" sx={{ boxShadow: 0, mb: 3 }}>
                <Toolbar>
                    <Box component="div" sx={{ flexGrow: 1 }}>
                        <IconButton color='inherit' onClick={() => navigate('/')}>
                            <RestaurantIcon/>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
                        <IconButton sx={{mr:2}} size="small" color="inherit" onClick={() => dispatch(toggleTheme())}>
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Box>
                    <ProfileDropdown />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;