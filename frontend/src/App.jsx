import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoutes";

import Loading from './components/Loading'; // Import your loading indicator component
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error from "./pages/Error";
// import Product from "../../backend/models/Product";

import "./styles/app.scss";

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
  return (
    <>
    <Header/>
      <Outlet />
    <Footer />
    </>
  );
};

const LazyLoadingComponent = ({ component: LazyComponent }) => {
  return (
    <Suspense fallback={<Loading isLoading={false}/> } >
      <LazyComponent />
    </Suspense> 
  );
}

export default LazyLoadingComponent;

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
