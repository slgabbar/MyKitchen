import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, useTheme } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "../../../features/account/accountSlice";

function ProfileDropdown() {
    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.account);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const userIsAdmin = user?.userRoles.includes('Admin');
    const initials = userIsAdmin ? 'A' : `${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}`;

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar>{initials}</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem key="logout" onClick={() => dispatch(signOut())}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default ProfileDropdown;

