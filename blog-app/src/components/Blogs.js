import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    MDBBtn,
    MDBCol,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBIcon,
} from "mdb-react-ui-kit";
import { useAuth } from "../components/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Blogs = ({ title, category, description, id, imageUrl, excerpt = (text) => text?.substring(0, 100) + "...", handleDelete }) => {
    const { user } = useAuth(); // Lấy thông tin user từ context
    const navigate = useNavigate(); // Hook để điều hướng
    const location = useLocation(); // Lấy thông tin location từ react-router-dom
    const [likes, setLikes] = useState(0); // Tổng số like
    const [isLiked, setIsLiked] = useState(false); // Trạng thái đã like hay chưa
    const [data1, setData1] = useState([]); // Lưu trữ những người đã like bài viết

    useEffect(() => {
        fetchLikes();
    }, [id]);

    // Hàm để lấy số lượt like và những người đã like bài viết
    const fetchLikes = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/blogs/${id}`);
            const likesData = response.data.likes || 0;
            const likedByData = response.data.likedBy || [];

            setLikes(likesData);
            setData1(likedByData);

            // Kiểm tra xem người dùng đã like chưa
            const isDuplicate = likedByData.includes(user?.id);
            setIsLiked(isDuplicate);
        } catch (error) {
            console.error("Failed to fetch likes:", error);
        }
    };

    // Hàm xử lý khi người dùng like hoặc bỏ like
    const toggleLike = async () => {
        if (!user) {
            alert("You must log in to like this post.");
            navigate("/login"); // Điều hướng đến trang đăng nhập
            return;
        }

        try {
            const updatedLikes = isLiked ? likes - 1 : likes + 1;
            let updatedData = [...data1];

            if (!isLiked) {
                // Nếu người dùng chưa like, thêm vào danh sách likedBy
                updatedData.push(user.id);
            } else {
                // Nếu người dùng đã like, bỏ khỏi danh sách likedBy
                updatedData = updatedData.filter(item => item !== user.id);
            }

            setLikes(updatedLikes);
            setData1(updatedData);
            setIsLiked(!isLiked);

            // Cập nhật API với danh sách likedBy mới và số lượng like mới
            await axios.patch(`http://localhost:5000/blogs/${id}`, {
                likedBy: updatedData,
                likes: updatedLikes,
            });
        } catch (error) {
            console.error("Failed to update likes:", error);
        }
    };

    // Kiểm tra xem trang hiện tại có phải là trang "MyBlog" không
    const isMyBlogsPage = location.pathname === `/MyBlog/${user?.id}`;

    return (
        <MDBCol size="4" className="mt-5">
            <MDBCard className="h-100 mt-2" style={{ maxWidth: "22rem" }}>
                <MDBCardImage
                    src={imageUrl}
                    alt={title}
                    position="top"
                    style={{ maxWidth: "100%", height: "180px" }}
                />
                <MDBCardBody>
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <MDBCardText>
                        {excerpt(description)}
                        <Link to={`/blog/${id}`}>Read More</Link>
                    </MDBCardText>
                    {/* Nút Like */}
                    <div className="d-flex align-items-center mt-2">
                        <MDBBtn
                            outline
                            color="danger"
                            size="sm"
                            onClick={toggleLike}
                            className="me-2"
                        >
                            <MDBIcon
                                fas
                                icon={isLiked ? "heart" : ["far", "heart"]}
                                size="lg"
                                style={{ color: isLiked ? "red" : "gray" }}
                            />
                        </MDBBtn>
                        <span>{likes} Likes</span>
                    </div>
                    {/* Chức năng Edit & Delete */}
                    {isMyBlogsPage && handleDelete && (
                        <span>
                            <MDBBtn
                                className="mt-1"
                                tag="a"
                                color="none"
                                onClick={() => handleDelete(id)}
                            >
                                <MDBIcon
                                    fas
                                    icon="trash"
                                    style={{ color: "#dd4b39" }}
                                    size="lg"
                                />
                            </MDBBtn>
                            <Link to={`/editBlog/${id}`}>
                                <MDBIcon
                                    fas
                                    icon="edit"
                                    style={{ color: "#55acee", marginLeft: "10px" }}
                                    size="lg"
                                />
                            </Link>
                        </span>
                    )}
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    );
};

export default Blogs;
