import { createContext, ReactNode, useContext, useState } from 'react';

type AuthContextType = {
    isLoggedIn: boolean;
    phone: string | null;
    login: (phone: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// TODO: this is an in-memory mock so the app compiles and the login flow is
// wireable end-to-end. Replace `login`/`logout` with your real auth API call
// and persist the session (SecureStore, token refresh, etc.) instead of
// plain useState, which resets on app restart.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [phone, setPhone] = useState<string | null>(null);

    const login = (loggedInPhone: string) => {
        setPhone(loggedInPhone);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setPhone(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, phone, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within an <AuthProvider>');
    }
    return ctx;
};