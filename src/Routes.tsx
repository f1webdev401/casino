import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import LandingPage from "./pages/LandingPage";
import Roulette from "./pages/games/roulette/Roulette";
import Login from "./pages/login-register/Login";
import Register from "./pages/login-register/Register";
import Aboutus from "./pages/Aboutus";
import Affiliates from "./pages/Affiliates";
import CashinsPage from "./pages/transactions/CashinsPage";
import WithdrawPage from "./pages/transactions/WithdrawPage";
import DepositPage from "./pages/transactions/DepositPage";
import WithrdawalsPage from "./pages/transactions/WithrdawalsPage";
import AccountPage from "./pages/account/AccountPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminUser from "./pages/admin/components/AdminUser";
import AdminWithdraw from "./pages/admin/components/AdminWithdraw";
import Games from "./pages/games/Games";
import { SignupProvider } from "./context/SignupContext";
import { UserContextProvider } from "./context/UserContext";
import RedeemPoints from "./pages/redeempoints/RedeemPoints";
import Uprizehunt from "./pages/games/uprizehunt/Uprizehunt";
import RaffleDraw from "./pages/games/raffledraw/RaffleDraw";
import AffiliateAdmin from "./pages/affiliate/AffiliateAdmin";
import AffiliateDashboard from "./pages/affiliate/AffiliateDashboard";
import Keno from "./pages/games/keno/Keno";
import AffiliateCashout from "./pages/affiliate/AffiliateCashout";
import Plinko from "./pages/games/plinko/Plinko";
import HighLow from "./pages/games/highlow/HighLow";
const router = createBrowserRouter([
    {
        path: '/',
        element:( 
            <UserContextProvider>
                    <SignupProvider>
                        <App /> 
                    </SignupProvider>
            </UserContextProvider>
                ),
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
                path: 'ultimateprizehunt',
                element: <Uprizehunt />
            },
            {
                path: 'keno',
                element: <Keno/>
            },
            {
                path: 'plinko',
                element: <Plinko/>
            },
            {
                path: 'highlow',
                element: <HighLow/>
            },
            {
                path: 'raffledraw',
                element: <RaffleDraw/>
            },
            {
                path:'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            },
            {
                path:'cashins',
                element: <CashinsPage />
            },
            {
                path:'withdrawals',
                element: <WithrdawalsPage/>
            },
            {
                path: 'deposit',
                element: <DepositPage />
            },
            {
                path:'withdraw',
                element: <WithdrawPage />
            },
            {
                path:'account',
                element: <AccountPage/>
            },
            {
                path:'games',
                element: <Games/>
            },
            {
                path:'redeempoints',
                element:<RedeemPoints/>
            }
        ]
    }
    
    ,
    {
        path:'/smmadminpage',   
        element: <AdminHomePage/>,
        children : [
            {
                path: 'adminusers',
                element: <AdminUser/>
            },
            {
                path: 'adminwithdrawals',
                element: <AdminWithdraw/>
            }
        ]
    },
    {
        path:'affiliate',
        element: <AffiliateAdmin/>,
        children: [
            {
                path:'',
                element:<AffiliateDashboard/>
            },
            {
                path: 'cashout',
                element: <AffiliateCashout/>
            }
        ]
    }
])

export function Routes() {
    return <RouterProvider router={router} />
}