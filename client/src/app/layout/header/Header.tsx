import { AppBar, Box, Chip, Container, Fade, Paper, Popper, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import React from "react";


function Header() {

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

    return (

        <Box sx={{ flexGrow:1, display: 'flex' }}>
        <AppBar component="nav">
          <Toolbar>
            <Container sx={{display:'flex', justifyContent:'end'}}>
                <Chip label="Profile Chip" onClick={handleClick}/>
                <Popper open={open} anchorEl={anchorEl} placement='bottom' transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={500}>
                      <Paper>
                        <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
                      </Paper>
                    </Fade>
                  )}
              </Popper>
            </Container>
          </Toolbar>
        </AppBar>
    </Box>
    )}

export default Header;