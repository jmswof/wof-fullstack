import { createContext, useContext } from 'react';

export type AuthType = {
    user: object;
    setUser: (user:object) => void;
}

export const AuthContext = createContext<AuthType | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used inside the AuthProvider');
    }

    return context;
}