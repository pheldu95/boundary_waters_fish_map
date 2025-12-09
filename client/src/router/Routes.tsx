import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../features/home/HomePage";
import MapPage from "../features/map/MapPage";
import CaughtFishTable from "../features/caughtFish/CaughtFishTable";
import FishingLures from "../features/fishingLures/FishingLures";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path:'map', element: <MapPage />},
            {path: 'caughtFish', element:  <CaughtFishTable />},
            {path: 'fishingLures', element: <FishingLures />}
        ]
    }
]);