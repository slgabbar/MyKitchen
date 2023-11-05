import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut, toggleTheme } from "../../../features/account/accountSlice";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


function ProfileDropdown() {
    const theme = useTheme();
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
                        <LogoutIcon/>
                        </ListItemIcon>
                        Logout
                </MenuItem>
                <Divider />
                <Box sx={{display: 'flex', alignItems: 'center', pl:1}}>
                    <IconButton size="small" color="inherit" onClick={() => dispatch(toggleTheme())}>
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <Typography sx={{textTransform: 'capitalize', ml:1, mr:2}}>
                        {theme.palette.mode} Mode
                    </Typography>
                </Box>
            </Menu>
          </Box>
  )}

export default ProfileDropdown;

