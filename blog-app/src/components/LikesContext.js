import React, { createContext, useState, useContext } from "react";

// Tạo Context
const LikesContext = createContext();

// Custom hook để sử dụng LikesContext
export const useLikes = () => useContext(LikesContext);

export const LikesProvider = ({ children }) => {
    const [likesData, setLikesData] = useState({}); // Trạng thái likes toàn cục: { blogId: isLiked }

    const toggleLike = (id, isLiked) => {
        setLikesData((prev) => ({
            ...prev,
            [id]: isLiked,
        }));
    };

    const isLiked = (id) => likesData[id] || false;

    return (
        <LikesContext.Provider value={{ toggleLike, isLiked }}>
            {children}
        </LikesContext.Provider>
    );
};
