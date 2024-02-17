"use client"
import { getAuthUserFromCookie } from '@/lib/client/auth';
import { AuthUser } from '@/types/auth';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextProps = {
    isLoading: boolean;
    authUser: AuthUser | null,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    logoutCleanup: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);

    const logoutCleanup = () => {
        setAuthUser(null);
    }

    const loadUserData = () => {
        const user = getAuthUserFromCookie();
        if (!user) {
            console.log("Can't get the token from the cookie in AuthProvider");
            return;
        }
        setAuthUser(user);
    }

    const loadUserDataFromServer = async () => {
        try {
            const response = await fetch('/api/auth');
            const data = await response.json();
            const { success } = data;
            if (!success) {
                let message = 'Failed to load user data from server';
                if (data.message) message = data.message;
                console.error("Error in loadUserDataFromServer", message);
                return;
            }
        } catch (_) {
            console.error('Failed to load user data from server');
        } finally {
            loadUserData();
        }
    };

    useEffect(() => {
        loadUserDataFromServer();
    }, [])

    // Fires on page load
    useEffect(() => {
        const userData = getAuthUserFromCookie();
        setAuthUser(userData);
    }, [pathname]);


    return (
        <AuthContext.Provider value={{ authUser, logoutCleanup, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

