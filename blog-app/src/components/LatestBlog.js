import React from "react";
import { MDBCard, MDBRow, MDBCol, MDBCardImage, MDBCardBody } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import './LatestBlog.css';


const LatestBlog = ({ imageUrl, title, id, category }) => {
    return (
        <div>
            <Link to={`/blog/${id}`}>
                <MDBCard style={{ maxWidth: "300px", height: "80px" }} className="mt-2">
                    <MDBRow className="g-0">
                        <MDBCol md="3">
                            <MDBCardImage
                                src={imageUrl}
                                alt={title}
                                fluid
                                className="rounded-circle"
                                style={{ height: "80px" }}
                            />
                        </MDBCol>
                        <MDBCol md="9">
                            <MDBCardBody>
                                <p className="text-start latest-title" style={{ fontWeight: "bold" }}>
                                    {title}
                                </p>
                                <p className="text-start latest-category" style={{ fontSize: "12px", color: "#888" }}>
                                    {category}
                                </p>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </Link>
        </div>
    );
};

export default LatestBlog;
