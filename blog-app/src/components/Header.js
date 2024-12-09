import React, { useState } from "react";
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarToggler,
    MDBCollapse
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useAuth } from './AuthContext';
import "./Header.css"
const Header = () => {
    const [show, setShow] = useState(false);
    const { user, logout } = useAuth(); // Lấy thông tin người dùng từ AuthContext

    return (
        <div>
            <MDBNavbar expand='lg' light style={{ backgroundColor: "#541b1b" }}>
                <MDBNavbarToggler
                    type="button"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ color: "#fff" }}
                    onClick={() => setShow(!show)}
                >
                    <span>Menu</span>
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav className="me-auto">
                        <MDBNavbarItem>
                            <Link to="/" className="nav-link" style={{ color: "#fff", textDecorationLine: 'none' }}>Home</Link>
                        </MDBNavbarItem>
                        {user && ( // Hiển thị "Add Blog" nếu người dùng đã đăng nhập
                            <MDBNavbarItem>
                                <Link to="/addBlog" className="nav-link" style={{ color: "#fff", textDecorationLine: 'none' }}>
                                    Add Blog
                                </Link>
                            </MDBNavbarItem>
                        )}
                        {/* <MDBNavbarItem>
                            <Link to="/about" className="nav-link" style={{ color: "#fff" }}>
                                About
                            </Link>
                        </MDBNavbarItem> */}
                        {user ? (
                            <>
                                <MDBNavbarItem style={{ margin: "auto" }}>
                                    <Link
                                        to={`/userprofile/${user.id}`} // Chuyển hướng đến trang thông tin người dùng
                                        className="nav-link"
                                        style={{ color: "#fff", cursor: "pointer" }}
                                    >
                                        Hello, {user.firstname} {user.lastname}
                                    </Link>
                                </MDBNavbarItem>

                                <MDBNavbarItem style={{ margin: "auto" }}>
                                    <Link
                                        to={`/MyBlog/${user.id}`} // Chuyển hướng đến trang thông tin người dùng
                                        className="nav-link"
                                        style={{ color: "#fff", cursor: "pointer" }}
                                    >
                                        My Blog
                                    </Link>
                                </MDBNavbarItem>
                                <MDBNavbarItem style={{ margin: "auto" }}>
                                    <Link
                                        to={`/my-favorites`} // Chuyển hướng đến trang thông tin người dùng
                                        className="nav-link"
                                        style={{ color: "#fff", cursor: "pointer" }}
                                    >
                                        My Favorites
                                    </Link>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <button onClick={logout} style={{ color: "#fff", background: "none", border: "none" }}>
                                        Logout
                                    </button>
                                </MDBNavbarItem>
                            </>
                        ) : (
                            <>
                                <MDBNavbarItem>
                                    <Link to="/login" className="nav-link" style={{ color: "#fff", textDecorationLine: 'none' }}>Login</Link>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <Link to="/signin" className="nav-link" style={{ color: "#fff", textDecorationLine: 'none' }}>Sign Up</Link>
                                </MDBNavbarItem>
                            </>
                        )}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </div>
    );
};

export default Header;
