import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { signOut, toggleTheme } from "../../../features/account/accountSlice";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


function ProfileDropdown() {

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {user} = useAppSelector(state => state.account);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                            alt={user?.firstName! + user?.lastName}
                            src={user?.profilePhotoUrl}
                        /> 

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
            <MenuItem key="accountSettings" onClick={() =>  {
              navigate('account');
              setAnchorElUser(null);
            }}>
                  <ListItemIcon>
                    <SettingsIcon/>
                  </ListItemIcon>
                  Account Settings
            </MenuItem>
            <MenuItem key="logout" onClick={() => dispatch(signOut())}>
                  <ListItemIcon>
                    <LogoutIcon/>
                  </ListItemIcon>
                  Logout
            </MenuItem>
            <Divider/>
            <Box sx={{display: 'flex', alignItems: 'center', pl:1}}>
                <IconButton size="small" color="inherit" onClick={() => dispatch(toggleTheme())}>
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <Typography sx={{textTransform: 'capitalize', ml:1}}>
                  {theme.palette.mode} Mode
                </Typography>
            </Box>
            </Menu>
          </Box>
  )}

export default ProfileDropdown;

