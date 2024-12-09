import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ChangePassword.css'; // Đường dẫn tới file CSS
import { useAuth } from "../components/AuthContext";

const ChangePassword = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Thêm state cho Confirm Password
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth(); // Kiểm tra trạng thái đăng nhập và logout

    useEffect(() => {
        // Nếu người dùng chưa đăng nhập, điều hướng tới NotFound
        if (!isLoggedIn) {
            navigate("/notfound");
        }
    }, [isLoggedIn, navigate]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu mới và mật khẩu xác nhận
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match. Please try again.");
            return;
        }

        // Hiển thị hộp thoại xác nhận
        const confirmChange = window.confirm("Are you sure you want to change your password?");
        if (!confirmChange) {
            return; // Nếu người dùng chọn "Cancel", không tiếp tục
        }

        try {
            const response = await fetch(`http://localhost:5000/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: newPassword }),
            });

            if (response.ok) {
                setMessage("Password updated successfully!");
                navigate(`/userprofile/${id}`); // Điều hướng về UserProfile sau khi đổi mật khẩu
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="ba">
            <div className="profile-box">
                <h1>Change Password</h1>
                {message && <p>{message}</p>}
                <form onSubmit={handlePasswordChange}>
                    <label>
                        New Password:
                        <input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Confirm Password: {/* Thêm trường nhập liệu cho Confirm Password */}
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
