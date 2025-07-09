import { createBrowserRouter } from "react-router";
import Register from "./pages/register/Register";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/login/Login";
import Forget from "./pages/forget/Forget";
import Password from "./pages/password/Password";
import Home from "./pages/home/Home";
import RePass from './pages/rePass/RePass';
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/carts/Carts";



const routers = createBrowserRouter([
{
    path:'/',
    element:<MainLayout/> ,
  
    children:[
        {
            path:'/',
            element:<Home/>
        },
        
        {
            path:'/register',
            element:<Register/>
        },{
            path:'/login',
            element:<Login/>
        },{
            path:'/forget',
            element:<Forget/>
        },{
            path:'/rePass',
            element:<RePass/>
        },{
            path:'/password',
            element:<Password/>
        },{
             path: '/productDetails/:id',
            element:<ProductDetails/>
        },{
            path:'/carts',
            element:<Cart/>
        }

    ],
}
]);
export default routers;

