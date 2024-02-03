import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Registration from "../pages/Registration"
import { ProtectedRoute } from "./ProtectedRoute"
import Login from "../pages/Login";
import { useAuth } from "../provider/authProvider";
import UserTable from "../components/Table";

const Routes = () => {
    const {token}= useAuth();
    const publicRoutes = [
        {
            path: '/service',
            element: <div>Ovo je Servis strana</div>
        }
    ];
    const authenticatedRoutes = [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/users',
                    element: <UserTable/>,
                }
            ]
        }
    ];
    const notAuthenticatedRoutes = [
        {
            path: '/login',
            element: <Login />

        },
        {
            path: '/registration',
            element: <Registration />

        }
    ];
    const router = createBrowserRouter([
        ...publicRoutes,
        ...(!token ? notAuthenticatedRoutes : []),
        ...authenticatedRoutes
    ]);

    return <RouterProvider router={router}/>
}
export default Routes;