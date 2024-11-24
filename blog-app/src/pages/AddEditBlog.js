import React, { useEffect, useState } from 'react';
import { MDBValidation, MDBInput, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    title: "",
    description: "",
    category: "",
    imageUrl: ""
};
const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech'];

const AddEditBlog = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [categoryErrMsg, setCategoryErrMsg] = useState(null);
    const [editMode, setEditMode] = useState(null);
    const { title, description, category, imageUrl } = formValue;

    const navigate = useNavigate();
    const { id } = useParams();

    // useEffect(() => {
    //     if (id) {
    //         setEditMode(true);
    //         getSingleBlog(id)
    //     } else {
    //         setEditMode(false);
    //         setFormValue({ ...initialState });
    //     }
    // }, [id]);
    //https://youtu.be/ZuMw6_mOJMk?t=5318
    // getSingleBlog = async (id) => {
    //     const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
    //     if (singleBlog.status === 200) {
    //         setFormValue({ ...singleBlog.data });
    //     } else {
    //         toast.error("Something went wrong")
    //     }
    // }
    const getDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
        let yyyy = today.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category) {
            setCategoryErrMsg('Please select a category');
            return;
        }
        if (!description) {
            toast.error("Please provide a description");
        }
        if (title && description && category && formValue.imageUrl) {
            const currentDate = getDate();
            const updatedBlogData = { ...formValue, date: currentDate };


            const response = await axios.post('http://localhost:5000/blogs', updatedBlogData);
            if (response.status === 201) {
                toast.success('Blog Created Successfully');
                setFormValue(initialState);
                navigate("/");
            } else {
                toast.error('Something went wrong');
            }
            setFormValue({ title: "", description: "", category: "", imageUrl: "" });
            navigate("/");
        } else {
            toast.error('Please fill all fields and upload an image');
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

    //upload image
    const onUploadImage = (file) => {
        console.log("file", file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "jnecgtem");
        axios.post("http://api.cloudinary.com/v1_1/dzbinvixu/image/upload", formData).then((res) => {
            // console.log("Response", res);
            toast.info("Image Uploaded Successfully");
            setFormValue({ ...formValue, imageUrl: res.data.url })
        }).catch((err) => {
            toast.err("Something went wrong");
        })
    }

    return (
        <MDBValidation className='row g-3' style={{ marginTop: '100px' }} noValidate onSubmit={handleSubmit}>
            <p className='fs-2 fw-bold'>Add Blog</p>
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
                    invalid=""  // Kiểm tra nếu description rỗng
                    validation="Please provide a description" // Thông báo lỗi
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
                <MDBBtn type='submit' style={{ marginRight: '10px' }}>Add</MDBBtn>
                <MDBBtn color='danger' style={{ marginRight: '10px' }} onClick={() => navigate('/')}>Go Back</MDBBtn>
            </div>
        </MDBValidation>
    );
};

export default AddEditBlog;
