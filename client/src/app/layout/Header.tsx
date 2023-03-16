import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const navLinks = [
    {title: 'home', path:'/'},
    {title: 'about', path:'/about'},
    {title: 'contact', path:'/contact'},
]

function Header(props: any) {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            MUI
          </Typography>
          <Divider />
          <List>
                {navLinks.map(({title, path}) => (
                <ListItem key={path} disablePadding>
                    <ListItemButton component={NavLink} to={path} sx={{ textAlign: 'center' }}>
                    <ListItemText primary={title.toUpperCase()} />
                    </ListItemButton>
                </ListItem>
                ))}
          </List>
        </Box>
      );
    
      const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav">
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
                MUI
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navLinks.map(({title, path}) => (
                <Button component={NavLink} to={path} key={path} sx={{ color: '#fff' }}>
                    {title.toUpperCase()}
                </Button>
                ))}
            </Box>
            </Toolbar>
        </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
    )
}

export default Header;