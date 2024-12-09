import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";// Import custom hook useAuth
import './UpdateProfile.css';

const UpdateProfile = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");
    const { isLoggedIn, logout } = useAuth(); // Lấy trạng thái đăng nhập và hàm logout
    const navigate = useNavigate(); // Dùng để điều hướng

    useEffect(() => {
        // Nếu người dùng chưa đăng nhập, điều hướng tới NotFound
        if (!isLoggedIn) {
            navigate("/notfound");
            return;
        }

        // Lấy thông tin người dùng từ API
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/${id}`);
                if (response.ok) {
                    const userData = await response.json();
                    setFormData({
                        fname: userData.fname || "",
                        lname: userData.lname || "",
                        email: userData.email || "",
                        password: userData.password || ""
                    });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setMessage("Profile updated successfully!");
                setTimeout(() => navigate(`/userprofile/${id}`), 100); // Điều hướng về trang UserProfile sau 100ms
            } else {
                setMessage("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="back">
            <div className="update-profile-container">
                <h1>Update Profile</h1>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name</label>
                        <input
                            type="text"
                            name="fname"
                            value={formData.fname}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lname"
                            value={formData.lname}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ display: 'none' }}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div style={{ display: 'none' }}>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <button type="submit">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
