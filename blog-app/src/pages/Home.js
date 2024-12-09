import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import Blogs from "../components/Blogs";
import Search from "../components/Search";
import Category from "../components/Category";
import LatestBlog from "../components/LatestBlog";
import Pagination from "../components/Pagination";
import { Toast, ToastContainer } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    const { category } = useParams(); // Get category from URL
    const navigate = useNavigate(); // To navigate to different category

    const [data, setData] = useState([]);
    const [latestBlog, setLatestBlog] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalBlog, setTotalBlog] = useState(null);
    const [pageLimit] = useState(6);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(category || ""); // Default to URL category
    const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];

    useEffect(() => {
        setCurrentPage(0); // Reset page to 0 when category changes
        loadBlogsData(0, pageLimit, 0); // Load blogs on category change
        fetchLatestBlog();
    }, [category, selectedCategory]); // Reload data whenever category changes or selectedCategory changes



    const loadBlogsData = async (start, limit, increase, operation) => {
        try {
            let url = `http://localhost:5000/blogs?_start=${start}&_end=${start + limit}`;

            if (selectedCategory) {
                url += `&category=${selectedCategory}`;
            }

            // Tải lại số lượng blog sau khi thay đổi category
            const totalBlogResponse = await axios.get("http://localhost:5000/blogs");
            setTotalBlog(totalBlogResponse.data.length); // Cập nhật lại totalBlog

            const response = await axios.get(url);
            if (response.status === 200) {
                setData(response.data);
                if (operation === 'delete') {
                    setCurrentPage(0); // Nếu xóa blog, reset trang
                } else {
                    setCurrentPage((prev) => prev + increase); // Nếu không, tăng số trang
                }
            } else {
                setToastMessage("Something went wrong");
                setShowToast(true);
            }
        } catch (error) {
            setToastMessage("Error loading data");
            setShowToast(true);
        }
    };


    const fetchLatestBlog = async () => {
        try {
            const totalBlogResponse = await axios.get("http://localhost:5000/blogs");
            const start = totalBlogResponse.data.length - 4;
            const end = totalBlogResponse.data.length;
            const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`);
            if (response.status === 200) {
                setLatestBlog(response.data);
            } else {
                setToastMessage("Something went wrong");
                setShowToast(true);
            }
        } catch (error) {
            setToastMessage("Error fetching latest blog");
            setShowToast(true);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure that you want to delete this blog?")) {
            try {
                const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
                if (response.status === 200) {
                    loadBlogsData(0, pageLimit, 0, "delete");
                } else {
                    setToastMessage("Failed to delete blog");
                    setShowToast(true);
                }
            } catch (error) {
                setToastMessage("Error deleting blog");
                setShowToast(true);
            }
        }
    };

    const excerpt = (str) => {
        if (str.length > 50) {
            return str.substring(0, 50) + "...";
        }
        return str;
    };

    const onInputChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    
        // Nếu xóa hết các ký tự trong thanh tìm kiếm, gọi lại dữ liệu mặc định
        if (!value.trim()) {
            setData([]); // Xóa dữ liệu hiện tại
            loadBlogsData(0, pageLimit, 0); // Tải lại dữ liệu ban đầu
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.key === "Enter") { // Chỉ gọi tìm kiếm khi nhấn Enter
            handleSearch(e);
        }
    };
    
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchValue.trim()) {
            setData([]); // Xóa dữ liệu hiện tại
            loadBlogsData(0, pageLimit, 0); // Tải lại dữ liệu ban đầu nếu tìm kiếm trống
            return;
        }
    
        try {
            const response = await axios.get(`http://localhost:5000/blogs?q=${searchValue}`);
            if (response.status === 200) {
                const filteredData = response.data.filter((blog) =>
                    blog.title.toLowerCase().includes(searchValue.toLowerCase())
                );
                setData(filteredData);
                if (filteredData.length === 0) {
                    setToastMessage("No blogs found matching the title.");
                    setShowToast(true);
                }
            } else {
                setToastMessage("Error during search");
                setShowToast(true);
            }
        } catch (error) {
            setToastMessage("An error occurred while searching.");
            setShowToast(true);
        }
    };
     

    const handleCategory = (category) => {
        setSelectedCategory(category); // Cập nhật category
        if (category) {
            navigate(`/category/${category}`); // Chuyển hướng theo category
        } else {
            navigate('/'); // Trở về trang chủ nếu không chọn category
        }
        loadBlogsData(0, pageLimit, 0); // Load lại dữ liệu khi category thay đổi
    };


    const resetCategory = () => {
        setSelectedCategory("");
        loadBlogsData(0, pageLimit, 0);
    };

    return (
        <>
            <Search
                searchValue={searchValue}
                onInputChange={onInputChange}
                handleSearch={handleSearch}
                handleKeyPress={handleKeyPress}
            />
            <MDBRow>
                {data.length === 0 && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        No Blogs Found
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow>
                            {data.map((item, index) => (
                                <Blogs
                                    key={index}
                                    {...item}
                                    excerpt={excerpt}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
                <MDBCol size="3" style={{ marginTop: "20px" }}>
                    <h4 className="text-start">Latest Posts</h4>
                    {latestBlog.map((item, index) => (
                        <LatestBlog key={index} {...item} />
                    ))}
                    <Category options={options} handleCategory={handleCategory} resetCategory={resetCategory} />
                </MDBCol>
            </MDBRow>
            <div className="mt-3">
                <Pagination
                    currentPage={currentPage}
                    loadBlogsData={loadBlogsData}
                    pageLimit={pageLimit}
                    totalBlog={totalBlog}
                    dataLength={data.length}
                />
            </div>

            {/* Bootstrap Toast */}
            <ToastContainer position="top-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default Home;
