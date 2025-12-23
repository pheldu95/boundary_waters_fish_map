// router.tsx
import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../features/home/HomePage";
import MapPage from "../features/map/MapPage";
import CaughtFishTable from "../features/caughtFish/CaughtFishTable";
import FishingLures from "../features/fishingLures/FishingLures";
import LoginForm from "../features/security/LoginForm";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            //public routes
            { path: '', element: <HomePage /> },
            { path: 'login', element: <LoginForm /> },
            
            //protected routes - Option 1: Wrap individually
            {
                path: 'map',
                element: (
                    <ProtectedRoute>
                        <MapPage />
                    </ProtectedRoute>
                )
            },
            {
                path: 'caughtFish',
                element: (
                    <ProtectedRoute>
                        <CaughtFishTable />
                    </ProtectedRoute>
                )
            },
            {
                path: 'fishingLures',
                element: (
                    <ProtectedRoute>
                        <FishingLures />
                    </ProtectedRoute>
                )
            },
            
        ]
    }
]);