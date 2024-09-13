import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element, roles }) => {
    const { user } = useAuth();

    if (!user) {
        console.log("User not found")
        return <Navigate to="/" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        console.log("Роль не совпадает. Ожидаемые роли:", roles, "Роль пользователя:", user.role);
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ProtectedRoute;