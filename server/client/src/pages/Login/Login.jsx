import "./login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUser } from "../../Redux/features/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data) {
        // console.log(data);
        alert(data.message);
        dispatch(storeUser({
            id:data._id,
            name:data.name,
            email:data.email,
            role:data.role,
            isAuthenticated:true
        }));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginser();
    // console.log(email, password);
  };

  return (
    <div className="login">
      <div className="left_section">
        <img
          src="https://onfido.com/wp-content/uploads/2023/01/age-verification-blog-image.png"
          alt="OnFido"
        />
      </div>
      <div className="form_section">
        <Link to="/">
          <h1>LoGo</h1>
        </Link>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
