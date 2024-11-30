import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './UserProfile.css';

const UserProfile = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [user, setUser] = useState(null); // Lưu trữ thông tin người dùng
    const [message, setMessage] = useState("");

    useEffect(() => {
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
    }, [id]);

    if (!user) {
        return <div>{message || "Loading..."}</div>;
    }

    return (
        <div className="background">
            <div className="profile-container">
                <h1>User Profile</h1>
                <p><strong>First Name:</strong> {user.fname}</p>
                <p><strong>Last Name:</strong> {user.lname}</p>
                <p><strong>Email:</strong> {user.email}</p>
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
