import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";// Import custom hook useAuth
import './UserProfile.css';

const UserProfile = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [user, setUser] = useState(null); // Lưu trữ thông tin người dùng
    const [message, setMessage] = useState("");
    const { isLoggedIn } = useAuth(); // Kiểm tra trạng thái đăng nhập
    const navigate = useNavigate(); // Dùng để điều hướng

    useEffect(() => {
        // Nếu người dùng chưa đăng nhập, điều hướng tới NotFound
        if (!isLoggedIn) {
            navigate("/notfound");
            return;
        }

        // Gọi API để lấy thông tin người dùng
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/${id}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    setMessage("Failed to load user data.");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setMessage("An error occurred while fetching user data.");
            }
        };

        fetchUser();
    }, [id, isLoggedIn, navigate]);

    if (!user) {
        return <div>{message || "Loading..."}</div>;
    }

    return (
        <div className="background">
            <div className="profile-container">
                <h1>User Profile</h1>
                <div style={{ textAlign: 'left' }}>
                    <p><strong>First Name:</strong> {user.fname}</p>
                    <p><strong>Last Name:</strong> {user.lname}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
                <Link to={`/updateprofile/${id}`}>
                    <button>Update Information</button>
                </Link>
                <Link to={`/changepassword/${id}`}>
                    <button>Change Password</button>
                </Link>
            </div>
        </div>
    );
};

export default UserProfile;
