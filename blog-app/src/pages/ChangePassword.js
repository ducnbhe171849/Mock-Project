import React, { useState } from "react";
import { useParams } from "react-router-dom";
import './ChangePassword.css'; // Đường dẫn tới file CSS trên

const ChangePassword = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handlePasswordChange = async (e) => {
        e.preventDefault();

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
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
