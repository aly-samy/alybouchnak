import { createContext, useContext, useState, type ReactNode } from 'react';

interface AdminAuthContextType {
    isAuthenticated: boolean;
    token: string;
    login: (password: string) => boolean;
    logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);
const SESSION_KEY = 'admin_auth';
const TOKEN_KEY = 'admin_token';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem(SESSION_KEY) === 'true';
    });
    const [token, setToken] = useState(() => {
        return sessionStorage.getItem(TOKEN_KEY) || '';
    });

    const login = (password: string): boolean => {
        const correct = import.meta.env.VITE_ADMIN_PASSWORD;
        if (password === correct) {
            sessionStorage.setItem(SESSION_KEY, 'true');
            sessionStorage.setItem(TOKEN_KEY, password);
            setIsAuthenticated(true);
            setToken(password);
            return true;
        }
        return false;
    };

    const logout = () => {
        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
        setIsAuthenticated(false);
        setToken('');
    };

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const ctx = useContext(AdminAuthContext);
    if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
    return ctx;
}
