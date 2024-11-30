import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true); // Đặt trạng thái là true khi đăng nhập
    };
    const logout = () => {
        setUser(null);
        setIsLoggedIn(false); // Đặt trạng thái là false khi đăng xuất
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
