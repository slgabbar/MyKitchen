import { Box, AppBar, Toolbar, IconButton, Typography, Button, Badge, List, ListItem } from "@mui/material"
import { NavLink } from "react-router-dom";

const rightLinks = [
    {title: 'login', path:'/login'},
    {title: 'register', path:'/register'},
]

const navStyles = {
    color: 'inherit',
    textDecoration:'none',
    typography: 'h6',
    '&:hover': {
      color: 'grey.500'
    },
    '&.active': {
      color: 'text.secondary'
    }
}

const headerStyles = {
    "&html:not([data-scroll='0']) header": {
        backgroundcolor: 'red !important'
    },
}


export function Header() {
    return (
        <>
            <AppBar position='sticky' sx={headerStyles}>
                <Toolbar sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink}
                    to='/'
                    sx={navStyles}>
                        React
                    </Typography>
                </Box>
                <Box display='flex' alignItems='center'>
                    <List sx={{display: 'flex'}}>
                        {rightLinks.map(({title, path}) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>  
                        ))}
                    </List>
                </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}