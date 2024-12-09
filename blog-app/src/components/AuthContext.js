import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    useEffect(() => {
        // Lấy dữ liệu từ localStorage khi ứng dụng khởi động
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(userData)); // Lưu vào localStorage
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user"); // Xóa khỏi localStorage
        navigate("/"); // Điều hướng về trang Home
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
