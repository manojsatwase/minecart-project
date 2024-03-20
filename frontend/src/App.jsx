import { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

import Loading from './components/Loading'; // Import your loading indicator component
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error from "./pages/Error";

import ProtectedRoute from "./utils/ProtectedRoutes";

import "./styles/app.scss";
import { useDispatch } from "react-redux";
import { loadUserAPI } from "./api/userApiCall";


const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Cart = lazy(()=> import('./pages/Cart'));
const Product = lazy(() => import('./pages/Product'))
const MyProfile = lazy(() => import('./pages/MyProfile'));

// Import Daynamic Route
// by default react load all component
// admin page
const Dashboard = lazy(()=>import("./pages/Dashboard"));
const Products = lazy(()=> import("./pages/Products"))
const Customers = lazy(()=> import("./pages/Customers"));
const Transaction = lazy(()=> import("./pages/Transaction"));


// admin management
const NewProduct = lazy(() => import("./pages/admin/management/Newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/Productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/Transactionmanagement")
);

const AppLayout = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  useEffect(() => {
    const authToken = Cookies.get('auth_token');
      if (authToken) {
        console.log(authToken);
        setToken(authToken)
        dispatch(loadUserAPI());
      }
  }, [dispatch]);
  return (
    <>
    <Header/>
      <Outlet />
    <Footer />
    </>
  );
};

const LazyLoadingComponent = function ({ component: LazyComponent }) {
  return (
    <Suspense fallback={<Loading/> } >
      <LazyComponent />
    </Suspense> 
  );
}


export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
       {
        path: "/",
        element: <LazyLoadingComponent component={Home} />
       },{
        path:"/products",
        element:<LazyLoadingComponent component={Products} />
      },{
        path: "/products/:id",
        element: <LazyLoadingComponent component={Product} />
       },
       {
        path: "/search",
        element: <LazyLoadingComponent component={Search} />
       },{
        path: "/cart",
        element: <LazyLoadingComponent component={Cart} />
       },{
        path:"/myprofile",
        element: <LazyLoadingComponent component={MyProfile} />
       },
      {
        element: <ProtectedRoute role="admin" />,
        children: [
          {
            path: "/admin/dashboard",
            element: <LazyLoadingComponent component={Dashboard} />,
          },
          {
            path: "/admin/product",
            element: <LazyLoadingComponent component={Products} />,
          },
          {
            path: "/admin/customer",
            element: <LazyLoadingComponent component={Customers} />,
          },
          {
            path: "/admin/transaction",
            element: <LazyLoadingComponent component={Transaction} />,
          },
          {
            path: "/admin/management/newproduct",
            element: <LazyLoadingComponent component={NewProduct} />,
          },
          {
            path: "/admin/management/productmanagement",
            element: <LazyLoadingComponent component={ProductManagement} />,
          },
          {
            path: "/admin/management/transactionmanagement",
            element: <LazyLoadingComponent component={TransactionManagement} />,
          },
        ],
      },
    ],
  },
]);
