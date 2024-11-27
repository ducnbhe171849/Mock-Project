import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './signin.css';


export default function Signin() {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({})
    const [valid, setValid] = useState(true)
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        let isvalid = true;
        let validationErrors = {};
        if (formData.fname === "" || formData.fname === null) {
            isvalid = false;
            validationErrors.fname = "First Name is required"
        }
        if (formData.lname === "" || formData.lname === null) {
            isvalid = false;
            validationErrors.fname = "Last Name is required"
        }
        if (formData.email === "" || formData.email === null) {
            isvalid = false;
            validationErrors.fname = "Email is required"
        }
        if (formData.password === "" || formData.password === null) {
            isvalid = false;
            validationErrors.fname = "Password is required"
        }
        if (formData.confirmPassword === "" || formData.confirmPassword === null) {
            isvalid = false;
            validationErrors.fname = "ConfirmPassword is required"
        }
        setErrors(validationErrors)
        setValid(isvalid)
        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:5000/users', formData)
                .then(result => {
                    alert("Dang ky thanh cong")
                    navigate('/login')
                })
                .catch(err => console.log(err))
        }


    }
    return (
        <div className="containe">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="signup-form">
                        <form className="mt-5 border p-4 bg-light shadow" onSubmit={handleSubmit}>
                            <h4 className="mb-5 text-secondary">Create Your Account</h4>
                            {
                                valid ? <></> :
                                    <span className='text-danger'>
                                        {errors.fname}; {errors.lname}; {errors.email};
                                        {errors.password}; {errors.confirmPassword}
                                    </span>
                            }
                            <div className="row">
                                {/* First Name Input */}
                                <div className="mb-3 col-md-6">
                                    <label>First Name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        name="fname"
                                        className="form-control"
                                        placeholder="Enter First Name"
                                        onChange={(event) => setFormData({ ...formData, fname: event.target.value })}
                                        required
                                    />
                                </div>

                                {/* Last Name Input */}
                                <div className="mb-3 col-md-6">
                                    <label>Last Name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        name="lname"
                                        className="form-control"
                                        placeholder="Enter Last Name"
                                        onChange={(event) => setFormData({ ...formData, lname: event.target.value })}
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-3 col-md-12">
                                    <label>Email <span className="text-danger">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                                        required
                                    />
                                </div>

                                {/* Password Input */}
                                <div className="mb-3 col-md-12">
                                    <label>Password <span className="text-danger">*</span></label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                                        required
                                    />
                                </div>

                                {/* Confirm Password Input */}
                                <div className="mb-3 col-md-12">
                                    <label>Confirm Password <span className="text-danger">*</span></label>
                                    <input
                                        type="password"
                                        name="confirmpassword"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="col-md-12">
                                    <button className="btn btn-primary float-end">Signup Now</button>
                                </div>
                            </div>
                        </form>

                        {/* Login Redirect */}
                        <p className="text-center mt-3 text-secondary">
                            If you have an account, please <Link to="/login">Login now</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
