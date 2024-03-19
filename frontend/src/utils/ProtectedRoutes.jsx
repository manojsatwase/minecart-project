
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({role}) => {
  // this is comming from redux latter i will updated 
    const user = {isAuthenticated:true, adminRoute:true, isAdmin:true,userRole:["owner","admin"]} 
    
    const {isAuthenticated, adminRoute,isAdmin,userRole} = user;
 
   if (!userRole?.includes(role)) {
		return <Navigate to="/" replace />;
	}

   if(userRole[0] === role) {
    return <Outlet  />;
   }

   if(!userRole?.includes(role) || !isAuthenticated || !adminRoute || !isAdmin){
    return <Navigate to="/" replace />;
   }

   if((userRole[1] === role) && isAuthenticated && isAdmin && adminRoute ) {
     return <Outlet  />;
   }
	
}; 

export default ProtectedRoute;