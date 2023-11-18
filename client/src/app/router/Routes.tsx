import { createBrowserRouter } from "react-router-dom";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import RequireAuth from "../layout/RequireAuth";
import { Error } from "../layout/Error";
import AccountConfirmation from "../../features/account/AccountConfirmation";
import RegisterConfirmation from "../../features/account/RegisterConfirmation";
import RequestResetPassword from "../../features/account/RequestResetPassword";
import ResetPassword from "../../features/account/ResetPassword";
import Settings from "../../features/home/Settings";
import MyRecipes from "../../features/recipe/MyRecipes";
import Recipe from "../../features/recipe/Recipe";

export const router = createBrowserRouter([
    {
        path: '',
        element: <App/>,
        errorElement: <Error/>,
        children:[
            {element: <RequireAuth/>, children: [
                { path: '', element: <HomePage /> },
                { path: 'settings', element: <Settings /> },
                { path: 'myRecipes', element: <MyRecipes /> },
                { path: 'recipe/:id', element: <Recipe /> },
            ]},
            { path: 'login', element: <Login/> },
            { path: 'register', element: <Register /> },
            { path: 'accountConfirmation', element: <AccountConfirmation /> },
            { path: 'registerConfirmation', element: <RegisterConfirmation /> },
            { path: 'requestResetPassword', element: <RequestResetPassword /> },
            { path: 'resetPassword', element: <ResetPassword /> },
        ]
    }
]);