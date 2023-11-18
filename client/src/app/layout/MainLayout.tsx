import { Box, CssBaseline, Divider, IconButton, Menu,MenuItem, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut, toggleTheme } from "../../features/account/accountSlice";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { ReactNode, useState } from "react";
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import LogoutIcon from '@mui/icons-material/Logout';
import { ExpandMore } from "@mui/icons-material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { toggleSideNavState } from "../../features/system/systemSlice";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

interface MainLayoutProps {
    children?: ReactNode
}

function MainLayout(props: MainLayoutProps) {

    const theme = useTheme();
    const navigate = useNavigate();
    const { sideNavOpen } = useAppSelector(state => state.system);
    const { user } = useAppSelector(state => state.account);
    const pathname = useLocation();
    const dispatch = useAppDispatch();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box id="tets" sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={sideNavOpen} color="default">
                <DrawerHeader sx={{ p: 0, m: 0 }}>
                    <ListItem key={'profileDropdown'} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={handleOpenUserMenu}
                            sx={{
                                minHeight: 48,
                                justifyContent: sideNavOpen ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: sideNavOpen ? 1 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <RestaurantIcon></RestaurantIcon>
                            </ListItemIcon>
                            <ListItemText primary='My Kitchen' secondary={user?.email} sx={{ opacity: sideNavOpen ? 1 : 0 }} />
                            {sideNavOpen && <ExpandMore/>}
                        </ListItemButton>
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
                            <Divider />
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
                                <IconButton size="small" color="inherit" onClick={() => dispatch(toggleTheme())}>
                                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                                <Typography sx={{ textTransform: 'capitalize', ml: 1, mr: 2 }}>
                                    {theme.palette.mode} Mode
                                </Typography>
                            </Box>
                        </Menu>
                    </ListItem>
                </DrawerHeader>
                <Divider />
                <List>
                   <ListItem key={'home'} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={ () => navigate('/')}
                            selected={pathname.pathname === '/'}
                            sx={{
                                minHeight: 48,
                                justifyContent: sideNavOpen ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: sideNavOpen ? 1 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <HomeIcon></HomeIcon>
                            </ListItemIcon>
                            <ListItemText primary={'Home'} sx={{ opacity: sideNavOpen ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'myRecipes'} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => navigate('/myRecipes')}
                            selected={pathname.pathname === '/myRecipes'}
                            sx={{
                                minHeight: 48,
                                justifyContent: sideNavOpen ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: sideNavOpen ? 1 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <StickyNote2Icon></StickyNote2Icon>
                            </ListItemIcon>
                            <ListItemText primary={'My Recipes'} sx={{ opacity: sideNavOpen ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Box sx={{ marginTop: 'auto' }}>
                    <List>
                        <ListItem key="toggleDrawer" disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => dispatch(toggleSideNavState())}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: sideNavOpen ? 'end' : 'center',
                                    px: 2.5,
                                }}>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    }}>
                                    <SlideshowIcon sx={{ transform: sideNavOpen ? 'rotate(180deg)' : '' }} />
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ width: '100%', p: 3 }}>
                {props.children}
            </Box>
        </Box>
    );
}

export default MainLayout;