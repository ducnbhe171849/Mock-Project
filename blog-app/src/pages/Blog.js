import React, { useState, useEffect } from "react";
import {
    MDBIcon,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardImage,
    MDBTypography,
    MDBInput,
    MDBBtn,
} from "mdb-react-ui-kit";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import CustomToast from "./CustomToast "; // Import CustomToast component
import { useAuth } from "../components/AuthContext"; // Lấy thông tin từ AuthContext

const Blog = () => {
    const [blog, setBlog] = useState(null);
    const [relatedPost, setRelatedPost] = useState([]);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const { id } = useParams();
    const { user } = useAuth(); // Lấy thông tin user từ AuthContext
    const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng
    const [data1, setData1] = useState([]);
    useEffect(() => {
        if (id) {
            fetchBlogData();
        }
    }, [id]);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/blogs/${id}`);
            const relatedPostData = await axios.get(
                `http://localhost:5000/blogs?category=${response.data.category}&_start=0&_end=3`
            );

            if (response.status === 200) {
                setBlog(response.data);
                setLikes(response.data.likes || 0);
                setComments(response.data.comments || []);
                setData1(response.data.likedBy);
                const isDuplicate = response.data.likedBy.some((item) => item === user.id);

                setIsLiked(isDuplicate);
                setRelatedPost(
                    relatedPostData.data.filter((item) => item.id !== parseInt(id))
                );
            } else {
                showToastMessage("Failed to fetch blog data");
            }
        } catch (error) {
            showToastMessage("Failed to fetch data");
        }
    };

    const showToastMessage = (message) => {
        setToastMessage(message);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    const toggleLike = async () => {
        if (!user) {
            alert("You must be logged in to like posts. Redirecting to login page...");
            navigate("/login");
            return;
        }
        try {
            const updatedLikes = isLiked ? likes - 1 : likes + 1;


            const isDuplicate = data1.some((item) => item === user.id);

            if (!isDuplicate && !isLiked) {

                const updatedData = [...data1, user.id];
                setData1(updatedData);


                await axios.patch(`http://localhost:5000/blogs/${id}`, {
                    likedBy: updatedData,
                    likes: updatedLikes,
                });
            } else if (isLiked) {

                const updatedData = data1.filter((item) => item !== user.id);
                setData1(updatedData);
                await axios.patch(`http://localhost:5000/blogs/${id}`, {
                    likedBy: updatedData,
                    likes: updatedLikes,
                });
            }


            setLikes(updatedLikes);
            setIsLiked(!isLiked);

            showToastMessage(isLiked ? "You unliked this post!" : "You liked this post!");
        } catch (error) {
            showToastMessage("Failed to update likes");
        }
    };


    const handleAddComment = async () => {
        if (newComment.trim() === "") {
            showToastMessage("Comment cannot be empty!");
            return;
        }

        if (!user) {
            const confirmLogin = window.confirm(
                "You must be logged in to comment. Do you want to go to the login page?"
            );
            if (confirmLogin) {
                navigate("/login"); // Điều hướng đến trang /login nếu người dùng đồng ý
            }
            return;
        }

        try {
            const userComment = {
                firstname: user.firstname,
                lastname: user.lastname,
                content: newComment,
            };

            const updatedComments = [...comments, userComment];
            await axios.patch(`http://localhost:5000/blogs/${id}`, { comments: updatedComments });
            setComments(updatedComments);
            setNewComment(""); // Reset input field
            showToastMessage("Comment added successfully!"); // Hiển thị toast
        } catch (error) {
            console.error("Failed to add comment:", error);
            showToastMessage("Failed to add comment.");
        }
    };

    return (
        <MDBContainer style={{ border: "1px solid #d1ebe8", padding: "20px" }}>
            <Link to="/">
                <strong style={{ float: "left", color: "black" }} className="mt-3">
                    Go back
                </strong>
            </Link>

            <MDBTypography
                tag="h2"
                className="text-muted mt-2"
                style={{ display: "inline-block" }}
            >
                {blog?.title || "Loading..."}
            </MDBTypography>

            <img
                src={blog?.imageUrl || "placeholder.jpg"}
                className="img-fluid rounded"
                alt={blog?.title || "Placeholder"}
                style={{ width: "100%", maxHeight: "600px" }}
            />

            <div style={{ marginTop: "20px", textAlign: 'left' }}>
                <div style={{ height: "43px", background: "#f6f6f6" }}>
                    <MDBIcon
                        style={{ float: "left" }}
                        className="mt-3"
                        far
                        icon="calendar-alt"
                        size="lg"
                    />
                    <strong
                        style={{ float: "left", marginTop: "12px", marginLeft: "2px" }}
                    >
                        {blog?.date || "Unknown"}
                    </strong>
                </div>
                <MDBTypography className="lead md-0">
                    {blog?.description || "No description available"}
                </MDBTypography>
            </div>

            <div className="d-flex align-items-center mt-4">
                <MDBBtn outline color="danger" size="sm" onClick={toggleLike} className="me-2">
                    <MDBIcon
                        fas
                        icon={isLiked ? "heart" : ["far", "heart"]}
                        size="lg"
                        style={{ color: isLiked ? "red" : "gray" }}
                    />
                </MDBBtn>
                <span>{likes} Likes</span>
            </div>

            <div className="mt-5">
                <h5>Comments</h5>
                <div style={{ textAlign: 'left' }}>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div
                                key={index}
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "10px 0",
                                }}
                            >
                                <p style={{ fontWeight: "bold", margin: "0" }}>
                                    {comment.firstname} {comment.lastname}
                                </p>
                                <p style={{ margin: "0" }}>{comment.content}</p>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center' }}>No comments yet. Be the first to comment!</p>
                    )}
                </div>

                <MDBInput
                    className="mt-3"
                    type="text"
                    label="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <MDBBtn color="primary" className="mt-2" onClick={handleAddComment}>
                    Submit Comment
                </MDBBtn>
            </div>

            {relatedPost.length > 0 && (
                <>
                    <h5 className="mt-5">Related Posts</h5>
                    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                        {relatedPost.map((item, index) => (
                            <MDBCol key={index}>
                                <MDBCard>
                                    <Link to={`/blog/${item.id}`}>
                                        <MDBCardImage
                                            src={item.imageUrl}
                                            alt={item.title}
                                            position="top"
                                        />
                                    </Link>
                                </MDBCard>
                            </MDBCol>
                        ))}
                    </MDBRow>
                </>
            )}

            <CustomToast message={toastMessage} show={showToast} setShow={setShowToast} />
        </MDBContainer>
    );
};

export default Blog;
