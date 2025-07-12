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
import Checkout from "./components/checkout/Checkout";
import Profile from "./pages/profile/Profile";
import ProductsByCategory from './pages/productsByCategory/ProductsByCategory';
import Product from "./components/products/Product";
import ContactUs from "./pages/contactUs/ContactUs";
import AboutUs from "./pages/aboutUs/AboutUs";
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess";



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
            path:'/About Us',
            element:<AboutUs/>

        },
        {
            path:'/Contact Us',
            element:<ContactUs/>

        }
        ,{
            path:'/Home',
            element:<Home/>
        },{
path:'/payment-success',
element:<PaymentSuccess/>
        },
        {
           path:'/Products',
           element:<Product/>
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
        },{
            path:'/checkout',
            element:<Checkout/>
        },{
            path:'/profile',
            element:<Profile/>
        },{
  path: '/category/:id',
  element: <ProductsByCategory />
}

    ],
}
]);
export default routers;

