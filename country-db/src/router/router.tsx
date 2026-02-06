import { createBrowserRouter } from "react-router-dom";
import { Index } from "../pages/Index";
import { Country } from "../pages/Country";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />
    },
    {
        path: '/countries/:country',
        element: <Country />
    }
])