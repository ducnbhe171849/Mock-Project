import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import './login.css'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Sử dụng AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:5000/users");
      const user = response.data.find((u) => u.email === email);

      if (user) {
        if (user.password === password) {
          login({ firstname: user.fname, lastname: user.lname, id:user.id }); // Lưu thông tin vào AuthContext
          alert("Đăng nhập thành công!");
          navigate("/"); // Chuyển hướng về trang Home
        } else {
          setErrorMessage("Mật khẩu không chính xác");
        }
      } else {
        setErrorMessage("Email không tồn tại");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
      setErrorMessage("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div style={{ width: "300px" }}>
        <h3>Đăng nhập</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>
        <hr />
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Chưa có tài khoản? <a href="/signin">Đăng ký</a>
        </p>
      </div>
    </div>
  );
}
