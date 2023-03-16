import { createBrowserRouter } from "react-router-dom";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import RequireAuth from "../layout/RequireAuth";
import { Error } from "../layout/Error";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";


export const router = createBrowserRouter([
    {
        path: '',
        element: <App/>,
        errorElement: <Error/>,
        children:[
            {element: <RequireAuth/>, children: [
                {path: '', element: <HomePage/>},
                {path: 'about', element: <AboutPage/>},
                {path: 'contact', element: <ContactPage/>},
            ]},
            {path: 'login', element: <Login/> },
            {path: 'register', element: <Register/> },
        ]
    }
]);