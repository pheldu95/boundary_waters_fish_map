import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../AuthContext';
import LoadingSpinner from './placeholders/LoadingSpinner';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, isLoading } = useAuth();
    
    if (isLoading) {
        return <LoadingSpinner />;
    }
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    return <>{children}</>;
};