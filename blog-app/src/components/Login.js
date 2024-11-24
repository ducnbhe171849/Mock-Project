import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [valid, setValid] = useState(true)
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};
    if (Object.keys(validationErrors).length === 0) {
      axios.get('http://localhost:5000/users')
        .then(result => {
          result.data.map(user => {
            if (user.email === formData.email) {
              if (user.password === formData.password) {
                alert('Dang nhap thanh cong')
                navigate('/home')
              } else {
                isvalid = false
                validationErrors.password = "Password is incorrect"
              }
            } else if (formData.email !== "") {
              isvalid = false
              validationErrors.email = "Email not found"
            }
          })
          setErrors(validationErrors)
          setValid(isvalid)
        })
        .catch(err => console.log(err))
    }


  }

  return (
    <div className='login-background'>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="mb-3">
              <h3>Login Form</h3>
              {
                valid ? <></> :
                  <span className='text-danger'>
                    {errors.email};
                    {errors.password}
                  </span>
              }
            </div>
            <form className="shadow p-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="username"
                  id="username"
                  placeholder="Email"
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="Password"
                  placeholder="Password"
                  onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                  required
                />
              </div>

              <a href="#" className="float-end text-decoration-none">
                Reset Password
              </a>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>

              <hr />

              <p className="text-center mb-0">
                If you have not account <Link to="/signin"><button>Registration Now</button></Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
