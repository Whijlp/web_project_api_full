import { Navigate, useLocation} from "react-router";

const ProtectorRoute = ({isLoggedIn, children}) => {
    
    const location = useLocation();

    const proctedRoute = "/";

    if (!isLoggedIn && location.pathname === proctedRoute) {
      return <Navigate to="/signin" replace />;
    }
    if (isLoggedIn && location.pathname !== proctedRoute) {
      return <Navigate to="/" replace />;
    }

    return children;
    }

    export default ProtectorRoute;