import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const ProtectedRoute = () => {
    const {user} = useAuthContext();
    
    if (!user) {
        return <Navigate to="/sign-in" />
    }

    return <Outlet />;
}

export default ProtectedRoute;