import { AppBar, Box, Toolbar, Typography } from "@mui/material";


function Header() {
  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static" color="default" sx={{boxShadow: 0}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MUI
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )}

export default Header;