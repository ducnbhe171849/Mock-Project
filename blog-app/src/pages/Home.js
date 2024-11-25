import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Blogs from "../components/Blogs";

const Home = () => {
    const [data, setData] = useState([]);
    const [latestBlog, setLatestBlog] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalBlog, setTotalBlog] = useState(null);
    const [pageLimit] = useState(5);
    const [toasts, setToasts] = useState([]); // Quản lý danh sách thông báo

    const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];

    useEffect(() => {
        loadBlogsData(0, 5, 0);
        fetchLatestBlog();
    }, []);

    const showToast = (type, message) => {
        const id = Date.now();
        setToasts([...toasts, { id, type, message }]);

        // Xóa thông báo sau 3 giây
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    };

    const loadBlogsData = async (start, end, increase, operation) => {
        const totalBlog = await axios.get("http://localhost:5000/blogs");
        setTotalBlog(totalBlog.data.length);
        const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
        if (response.status === 200) {
            setData(response.data);
            if (operation) {
                setCurrentPage(0);
            } else {
                setCurrentPage(currentPage + increase);
            }
        } else {
            showToast("danger", "Something went wrong");
        }
    };

    const fetchLatestBlog = async () => {
        const totalBlog = await axios.get("http://localhost:5000/blogs");
        const start = totalBlog.data.length - 4;
        const end = totalBlog.data.length;
        const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
        if (response.status === 200) {
            setLatestBlog(response.data);
        } else {
            showToast("danger", "Something went wrong");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure that you wanted to delete that blog?")) {
            const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
            if (response.status === 200) {
                showToast("success", "Blog Deleted Successfully");
                loadBlogsData(0, 5, 0, "delete");
            } else {
                showToast("danger", "Something went wrong");
            }
        }
    };

    const excerpt = (str) => {
        if (str.length > 50) {
            str = str.substring(0, 50) + "...";
        }
        return str;
    };

    const onInputChange = (e) => {
        if (!e.target.value) {
            loadBlogsData(0, 5, 0);
        }
        setSearchValue(e.target.value);
    };

    const handleSeach = async (e) => {
        e.preventDefault();
        const response = await axios.get(`http://localhost:5000/blogs?q=${searchValue}`);
        if (response.status === 200) {
            setData(response.data);
        } else {
            showToast("danger", "Something went wrong");
        }
    };

    const handleCategory = async (category) => {
        const response = await axios.get(`http://localhost:5000/blogs?category=${category}`);
        if (response.status === 200) {
            setData(response.data);
        } else {
            showToast("danger", "Something went wrong");
        }
    };

    return (
        <>
            {/* Toast Container */}
            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`toast show bg-${toast.type}`}
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                    >
                        <div className="toast-header">
                            <strong className="me-auto text-capitalize">{toast.type}</strong>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                            ></button>
                        </div>
                        <div className="toast-body">{toast.message}</div>
                    </div>
                ))}
            </div>

            <MDBRow>
                {data.length === 0 && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        No Blog Found
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow>
                            {data &&
                                data.map((item, index) => (
                                    <Blogs
                                        key={index}
                                        {...item}
                                        excerpt={excerpt}
                                        handleDelete={handleDelete}
                                    ></Blogs>
                                ))}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
                <MDBCol size="3">
                    {/* <h4 className="text-start">Latest Post</h4> */}
                    {/* Latest Blog and Category Components */}
                </MDBCol>
            </MDBRow>
        </>
    );
};

export default Home;

