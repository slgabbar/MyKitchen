import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { fetchCurrentUserAsnyc } from '../../features/account/accountSlice';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import Header from './header/Header';

  const lightTheme: ThemeOptions = {
    palette: {
        mode: 'light',
        background: {
            default: '#DCDCDC'
        },
    },
  };

   //const darkTheme: ThemeOptions = {
   // palette: {
   //     mode: 'dark',
   // },
  //};

  const mainAppStyles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

function App() {

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const initApp = useCallback(async () => {
        try {
            await dispatch(fetchCurrentUserAsnyc())
        }
        catch(error) {
            console.log(error);
        }
    }, [dispatch])

    useEffect(() => {
        initApp().then(() => setLoading(false))
    }, [initApp])

    const theme = createTheme(lightTheme);
    const {user} = useAppSelector(state => state.account);

    if (loading) return <span>Loading...</span>

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
            <CssBaseline />
            <Container sx={mainAppStyles}>
                {user && <Header />}
                <Outlet/>
            </Container>
        </ThemeProvider>
    );
}

export default App;
