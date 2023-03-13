import { Box, AppBar, Toolbar, Typography, List, ListItem } from "@mui/material"
import { useEffect, useState } from "react";
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
    mb: 4,
    bgcolor: "",
    color: "text.secondary",
    boxShadow: 0,
    '&.headerAtTop': {
        bgcolor: 'primary.main',
    }
}

export function Header() {
    const [atTop, setAtTop] = useState(false);

    useEffect(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", () =>
          setAtTop(window.pageYOffset > 0)
        );
      }
    }, []);


    return (
        <>
            <AppBar className={atTop ? 'headerAtTop' : ''} position='sticky' sx={headerStyles}>
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