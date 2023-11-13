import MainLayout from "../../app/layout/MainLayout";
import { useAppSelector } from "../../app/store/configureStore";
import AdminHomePage from "./AdminHomePage";
import UserHomePage from "./UserHomePage";
function HomePage() {
    const { user } = useAppSelector(state => state.account);
    return (
        <MainLayout>
            {user?.userRoles.includes('Admin') && <AdminHomePage />}
            {user?.userRoles.includes('User') && <UserHomePage />}
        </MainLayout>
    )
}

export default HomePage;