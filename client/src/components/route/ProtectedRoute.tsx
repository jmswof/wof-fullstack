import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { auth } from '../../firebase';

const ProtectedRoute = () => {
    const {user, setUser} = useAuthContext();
    auth.onAuthStateChanged((user:object|null) => {
      setUser(user);
    })

    if (user === undefined) {
        return null; // Loading, soon it won't be undefined.
    }

    return user ? <Outlet /> : <Navigate to="/sign-in"/>;
}

export default ProtectedRoute;