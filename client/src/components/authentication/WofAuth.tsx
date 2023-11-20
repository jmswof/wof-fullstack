import { useAuthContext } from '../../context/AuthContext';
import { auth } from '../../firebase';

const WofAuth:React.FC = () => {
    const { setUser } = useAuthContext();
    auth.onAuthStateChanged((user) => {
        setUser(user);
    });
    
    return <></>;
}

export default WofAuth;