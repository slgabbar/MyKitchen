import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

function PrivateRoute({children} : any) {
    const {user} = useAppSelector(state => state.account);
    return user ? children : <Navigate to="/login"/>;
}

export default PrivateRoute;