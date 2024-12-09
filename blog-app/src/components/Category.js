import React from "react";
import { MDBCard, MDBListGroup, MDBListGroupItem, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom

const Category = ({ handleCategory = () => { }, resetCategory = () => { }, options = [] }) => {
  const navigate = useNavigate(); // Tạo hàm navigate

  // Hàm điều hướng về trang chủ và reset danh mục
  const handleBackHome = () => {
    resetCategory(); // Reset trạng thái danh mục
    navigate("/"); // Điều hướng về trang Home (đường dẫn `/` tùy theo router của bạn)
  };

  return (
    <MDBCard style={{ width: "18rem", marginTop: "20px" }}>
      <h4 style={{ color: "" }}>Categories</h4>
      <MDBListGroup flush>
        <MDBBtn className="mt-3" color="primary" style={{ height: "45px" }} onClick={handleBackHome}>
          Back Home
        </MDBBtn>
        {options && options.length > 0 ? (
          options.map((item, index) => (
            <MDBListGroupItem
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => handleCategory(item)}
            >
              {item}
            </MDBListGroupItem>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </MDBListGroup>
      {/* Thêm nút Back Home */}
    </MDBCard>
  );
};

export default Category;
