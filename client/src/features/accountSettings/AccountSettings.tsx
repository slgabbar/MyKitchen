import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProfileEdit from "./ProfileEdit";
import { Avatar, Card, CardContent, Grid } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import AvatarEdit from "./AvatarEdit";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width:'800px' }}>
          <Typography component='span'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function AccountSettings() {
  const [value, setValue] = useState(0);
  const {user} = useAppSelector(state => state.account);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box maxHeight='80%' sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', borderRadius: '15px' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{ hidden: true}}
        sx={{
            textTransform: 'none',
            borderRight: 1,
            borderColor: 'divider',
            p:2,
            "& button" : {borderRadius:'25px', marginY:'5px'},
            "& button:hover" : {color:'primary.main'},
            "& button:active" : {backgroundColor:'primary.light'},
            "& button.Mui-selected" : {backgroundColor:'primary.light', color:'white'},
          }}
      >
        <Tab sx={{textTransform:'none'}} label="My Profile" {...a11yProps(0)} />
        <Tab sx={{textTransform:'none'}} label="Appearance" {...a11yProps(1)} />
        <Tab sx={{textTransform:'none'}} label="Security" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>

          <Card variant="outlined" sx={{mb:3}}>
            <CardContent sx={{"&:last-child":{pb:2}}}>
              <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <Box sx={{display:'flex',flexDirection:'row'}}>
                  <Avatar
                    alt={`${user?.firstName} ${user?.lastName}`}
                    src={`data:image/jpeg;base64, ${user?.profilePhotoUrl}`}
                    sx={{ width: 100, height: 100 }}
                    />
                    <Box sx={{display:'flex',flexDirection:'column', ml:3, pt:1}}>
                      <Typography variant="subtitle1">{user?.firstName} {user?.lastName}</Typography>
                      <Typography variant="subtitle2">{user?.email}</Typography>
                    </Box> 
                </Box>
                <AvatarEdit/>         
              </Box>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{mb:3}}>
            <CardContent>
              <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <Typography sx={{fontWeight: 'bold', mb:2}} color="text.primary">
                  Personal Information
                </Typography>
                <ProfileEdit/>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="text.secondary">First Name</Typography>
                  <Typography>{user?.firstName}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="text.secondary">Last Name</Typography>
                  <Typography>{user?.lastName}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Appearance settings here...
      </TabPanel>
      <TabPanel value={value} index={2}>
        email change and password change here...
      </TabPanel>
    </Box>
  );
}

export default AccountSettings;