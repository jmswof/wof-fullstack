import { createContext, useState, PropsWithChildren, useContext } from 'react';

export type AuthType = {
    user: object;
    setUser: (user:object) => void;
}

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const [user, setUser] = useState<AuthType['user']>(null);
    return <AuthContext.Provider value={{user, setUser}}>
        {children}
    </AuthContext.Provider>
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used inside the AuthProvider');
    }

    return context;
}