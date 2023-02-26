import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { fetchCurrentUserAsnyc } from '../../features/account/accountSlice';
import HomePage from '../../features/home/HomePage';
import agent from '../api/agent';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

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

    if (loading) return <span>Loading...</span>

    const theme = createTheme({
        palette: {
          mode: 'light',
          background: {
            default: '#eaeaea'
          }
        },
      })
    
    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position='bottom-right' hideProgressBar />
            <CssBaseline />
            <Container>
                <Routes>
                    <Route path='/' element={<HomePage />}/>
                </Routes>
            </Container>
        </ThemeProvider>
    );
}

export default App;
