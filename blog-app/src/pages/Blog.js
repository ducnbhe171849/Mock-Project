import React, { useState, useEffect } from "react";
import {
    MDBIcon,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardImage,
    MDBTypography,
} from "mdb-react-ui-kit";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
// import Badge from "../components/Badge";
import { toast } from "react-toastify";

const Blog = () => {
    const [blog, setBlog] = useState(null);
    const [relatedPost, setRelatedPost] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getSingleBlog();
        }
    }, [id]);

    const getSingleBlog = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/blogs/${id}`);
            const relatedPostData = await axios.get(
                `http://localhost:5000/blogs?category=${response.data.category}&_start=0&_end=3`
            );
            if (response.status === 200) {
                setBlog(response.data);
                setRelatedPost(relatedPostData.data);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            toast.error("Failed to fetch data");
        }
    };

    const styleInfo = {
        display: "inline",
        marginLeft: "5px",
        float: "right",
        marginTop: "7px",
    };

    return (
        <MDBContainer style={{ border: "1px solid #d1ebe8" }}>
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
            <div style={{ marginTop: "20px" }}>
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
                    {/* <Badge styleInfo={styleInfo}>{blog?.category}</Badge> */}
                </div>
                <MDBTypography className="lead md-0">
                    {blog?.description || "No description available"}
                </MDBTypography>
            </div>
            {relatedPost.length > 0 && (
                <>
                    {relatedPost.length > 1 && <h1>Related Post</h1>}
                    <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                        {relatedPost
                            .filter((item) => item.id !== parseInt(id))
                            .map((item, index) => (
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
        </MDBContainer>
    );
};

export default Blog;
