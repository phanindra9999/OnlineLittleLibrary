import React, { useState } from "react";
import "./Login.css";
import LoginImg from "../../assets/login.svg";
import RegisterImg from "../../assets/register.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleInputChange = (e, setData) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        signInData
      );
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("username", response.data.username);
        navigate("/home");
        window.location.reload();
        enqueueSnackbar("Signed in successfully", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Error signing in", { variant: "error" });
      console.log(error);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    console.log(signUpData);
    try {
      const response = await axios.post(
        "http://localhost:4000/user/signup",
        signUpData
      );
      navigate("/login");
      window.location.reload();
      enqueueSnackbar("Signed up successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error signing up", { variant: "error" });
      console.log(error);
    }
  };

  return (
    <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form
            action="#"
            className="sign-in-form"
            onSubmit={handleSignInSubmit}
          >
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={signInData.email}
                onChange={(e) => handleInputChange(e, setSignInData)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={signInData.password}
                onChange={(e) => handleInputChange(e, setSignInData)}
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
            </div>
          </form>
          <form className="sign-up-form" onSubmit={handleSignUpSubmit}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => handleInputChange(e, setSignUpData)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => handleInputChange(e, setSignUpData)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleInputChange(e, setSignUpData)}
              />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Just Starting Out? </h3>
            <p>
              Sign up for free and dive into our vast collection of books - no
              cost attached!
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src={LoginImg} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Already a Member? </h3>
            <p>
              Sign in to continue your literary adventure. Let's explore more
              amazing books together!
            </p>
            <button className="btn transparent" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src={RegisterImg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
