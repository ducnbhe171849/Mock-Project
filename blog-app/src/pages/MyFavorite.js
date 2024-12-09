import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import Blogs from "../components/Blogs";
import { Toast, ToastContainer } from "react-bootstrap";
import Pagination from "../components/Pagination"; // Ensure Pagination component is available
import { useAuth } from "../components/AuthContext";

const MyFavorite = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalBlog, setTotalBlog] = useState(null);
    const [pageLimit] = useState(6); // Set page limit to 6, similar to MyBlog

    useEffect(() => {
        if (user) {
            fetchLikedBlogs(0, pageLimit);
        }
    }, [user]);

    const fetchLikedBlogs = async (start, limit) => {
        try {
            const response = await axios.get("http://localhost:5000/blogs");
            if (response.status === 200) {
                const likedBlogs = response.data.filter(blog =>
                    blog.likedBy && blog.likedBy.includes(user.id)
                );
                setTotalBlog(likedBlogs.length);

                // Paginate the liked blogs
                const paginatedBlogs = likedBlogs.slice(start, start + limit);
                setData(paginatedBlogs);
            } else {
                setToastMessage("Error loading liked blogs");
                setShowToast(true);
            }
        } catch (error) {
            setToastMessage("Failed to fetch liked blogs");
            setShowToast(true);
        }
    };

    const handlePagination = (increase) => {
        const newPage = currentPage + increase;
        if (newPage >= 0 && newPage < Math.ceil(totalBlog / pageLimit)) {
            setCurrentPage(newPage);
            fetchLikedBlogs(newPage * pageLimit, pageLimit);
        }
    };

    return (
        <>
            <MDBRow>
                {data.length === 0 ? (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        No Liked Blogs Found
                    </MDBTypography>
                ) : (
                    <MDBCol>
                        <MDBContainer>
                            <MDBRow>
                                {data.map((item, index) => (
                                    <Blogs key={index} {...item} />
                                ))}
                            </MDBRow>
                        </MDBContainer>
                    </MDBCol>
                )}
            </MDBRow>

            <div className="mt-3">
                <Pagination
                    currentPage={currentPage}
                    loadBlogsData={handlePagination}
                    pageLimit={pageLimit}
                    totalBlog={totalBlog}
                    dataLength={data.length}
                />
            </div>

            {/* Toast */}
            <ToastContainer position="top-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default MyFavorite;
