import React, { useEffect, useState } from 'react';
import { MDBValidation, MDBInput, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useAuth } from "../components/AuthContext";
const initialState = {
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    createBy:""
};

const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech'];

const AddEditBlog = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [categoryErrMsg, setCategoryErrMsg] = useState(null);
    const [editMode, setEditMode] = useState(null);
    const [toasts, setToasts] = useState([]); // Quản lý danh sách thông báo
    const { title, description, category, imageUrl } = formValue;

    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const getDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
        let yyyy = today.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    useEffect(() => {
        if (id) {
            setEditMode(true);
            getSingleBlog(id);
        } else {
            setEditMode(false);
            setFormValue({ ...initialState });
        }
    }, [id]);

    const getSingleBlog = async (id) => {
        try {
            const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
            if (singleBlog.status === 200) {
                setFormValue({ ...singleBlog.data });
            } else {
                showToast("danger", "Something went wrong");
            }
        } catch (error) {
            showToast("danger", "Error fetching blog data");
        }
    };

    const showToast = (type, message) => {
        const toastId = Date.now();
        setToasts([...toasts, { id: toastId, type, message }]);

        // Xóa thông báo sau 3 giây
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category) {
            setCategoryErrMsg('Please select a category');
            return;
        }
        if (!description) {
            showToast("danger", "Please provide a description");
            return;
        }
        if (title && description && category && formValue.imageUrl) {
            const currentDate = getDate();
            const updatedBlogData = { ...formValue, date: currentDate, createBy: user.id };

            try {
                if (editMode) {
                    // Sử dụng PUT cho chế độ chỉnh sửa
                    const response = await axios.put(`http://localhost:5000/blogs/${id}`, updatedBlogData);
                    if (response.status === 200) {
                        showToast("success", 'Blog Updated Successfully');
                        navigate("/");
                    } else {
                        showToast("danger", 'Something went wrong');
                    }
                } else {
                 
                    // Sử dụng POST cho chế độ thêm mới
                    const response = await axios.post('http://localhost:5000/blogs', updatedBlogData);
                    if (response.status === 201) {
                       
                        showToast("success", 'Blog Created Successfully');
                        setFormValue(initialState);
                        navigate("/");
                    } else {
                        showToast("danger", 'Something went wrong');
                    }
                }
            } catch (error) {
                showToast("danger", editMode ? 'Error updating blog' : 'Error creating blog');
            }
        } else {
            showToast("danger", 'Please fill all fields and upload an image');
        }
    };

    

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const onCategoryChange = (e) => {
        setCategoryErrMsg(null);
        setFormValue({ ...formValue, category: e.target.value });
    };

    const onUploadImage = (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "jnecgtem");
        axios.post("http://api.cloudinary.com/v1_1/dzbinvixu/image/upload", formData)
            .then((res) => {
                showToast("info", "Image Uploaded Successfully");
                setFormValue({ ...formValue, imageUrl: res.data.url });
            })
            .catch(() => {
                showToast("danger", "Error uploading image");
            });
    };

    return (
        <div>
            <MDBValidation className='row g-3' style={{ marginTop: '100px' }} noValidate onSubmit={handleSubmit}>
                <p className='fs-2 fw-bold'>{editMode ? "Edit Blog" : "Add Blog"}</p>
                <div style={{ margin: 'auto', padding: '15px', maxWidth: '400px', alignContent: 'center' }}>
                    <MDBInput
                        value={title || ""}
                        name='title'
                        type='text'
                        onChange={onInputChange}
                        required
                        label='Title'
                        validation="Please provide a title"
                        invalid='true'
                    />
                    <br />
                    <MDBTextArea
                        value={description || ""}
                        name="description"
                        onChange={onInputChange}
                        required
                        label="Description"
                        rows={4}
                        invalid=""
                        validation="Please provide a description"
                    />
                    <br />
                    <MDBInput
                        name='imageUrl'
                        type='file'
                        onChange={(e) => onUploadImage(e.target.files[0])}
                        required
                        validation="Please provide an image"
                        invalid='true'
                    />
                    <br />
                    <select className='categoryDropDown' onChange={onCategoryChange} value={category}>
                        <option>Please select category</option>
                        {options.map((option, index) => (
                            <option key={index} value={option || ""}>{option}</option>
                        ))}
                    </select>
                    {categoryErrMsg && (
                        <div className='categoryErrMsg'>{categoryErrMsg}</div>
                    )}
                    <br />
                    <br />
                    <MDBBtn type='submit' style={{ marginRight: '10px' }}>
                        {editMode ? "Update" : "Add"}
                    </MDBBtn>
                    <MDBBtn color='danger' style={{ marginRight: '10px' }} onClick={() => navigate('/')}>
                        Go Back
                    </MDBBtn>
                </div>
            </MDBValidation>

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
        </div>
    );
};

export default AddEditBlog;
