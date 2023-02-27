import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from '../store/configureStore';
import { fetchCurrentUserAsnyc } from '../../features/account/accountSlice';
import Login from '../../features/account/Login';
import HomePage from '../../features/home/HomePage';
import PrivateRoute from './PrivateRoute';

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

    return (
        <>
            <ToastContainer position='bottom-right' hideProgressBar />
            <CssBaseline />
            <Container>
                <Routes>
                    <Route path='/' element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }>
                    </Route>
                    <Route path='/login' element={<Login />}/>
                </Routes>
            </Container>
        </>
    );
}

export default App;
