import { createContext, useContext, useState, type ReactNode } from 'react';

interface AdminAuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);
const SESSION_KEY = 'admin_auth';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem(SESSION_KEY) === 'true';
    });

    const login = (password: string): boolean => {
        const correct = import.meta.env.VITE_ADMIN_PASSWORD;
        if (password === correct) {
            sessionStorage.setItem(SESSION_KEY, 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        sessionStorage.removeItem(SESSION_KEY);
        setIsAuthenticated(false);
    };

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const ctx = useContext(AdminAuthContext);
    if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
    return ctx;
}
