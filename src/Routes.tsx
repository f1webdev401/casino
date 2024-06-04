import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import LandingPage from "./pages/LandingPage";
import Roulette from "./pages/games/roulette/Roulette";
import Login from "./pages/login-register/Login";
import Register from "./pages/login-register/Register";
import Aboutus from "./pages/Aboutus";
import Affiliates from "./pages/Affiliates";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <LandingPage />
            },
            {
                path:'aboutus',
                element: <Aboutus />
            },
            {
                path: 'affiliates',
                element: <Affiliates />
            },
            {
                path: 'roulettegame',
                element: <Roulette />
            },
            {
                path:'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            }
        ]
    }
])

export function Routes() {
    return <RouterProvider router={router} />
}