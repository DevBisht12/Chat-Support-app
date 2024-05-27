import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from 'react-redux';

import { storeUser } from '../../Redux/features/userSlice';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:"user",
    confirmPassword: "",
    isAuthenticated: false
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, isAuthenticated: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return alert("Please fill all the fields");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      
      
      console.log(response.status);

      if (response.status===201) {
        setFormData(...data.role)
        dispatch(storeUser(formData));
        alert(data.message);
        navigate('/login');
        
      }else{
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Signup">
      <div className="signup_form">
        <div className="left_section">
          <img
            src="https://onfido.com/wp-content/uploads/2022/08/verification-experience-inline-blog-image.jpg"
            alt=""
          />
        </div>
        <div className="form_section">
          <Link to='/'>
            <h1>LoGo</h1>
          </Link>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
            />
            <label htmlFor="email">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
            />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              autoComplete="off"
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              autoComplete="off"
            />
            
            <button type="submit">Submit</button>
            <p>Already have an account? <Link to='/login'>Log in</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
