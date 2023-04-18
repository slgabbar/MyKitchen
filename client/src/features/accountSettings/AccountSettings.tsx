import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
        <Box sx={{ p: 3, width:'1000px' }}>
          <Typography>{children}</Typography>
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box maxHeight='80%' sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', borderRadius: '15px', paddingY: '5px' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{ hidden: true}}
        sx={{
            textTransform: 'none',
            paddingX: '20px',
            borderRight: 1,
            borderColor: 'divider',
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
        Profile settings here...
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