import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ProfileDropdown from "./ProfileDrowdown";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static" color="default" sx={{boxShadow: 0, mb:3}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
            onClick={() => navigate('/')}>
          </Typography>
          <ProfileDropdown/>
        </Toolbar>
      </AppBar>
    </Box>
  )}

export default Header;