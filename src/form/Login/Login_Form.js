import React, { useState } from "react";
import classes from "./login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";

const Login_Form = ({ onToggleForm, setUser, registeredUsers }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/users/login", { email, password });

      // console.log("API Response:", response); // Debugging log

      if (response && response.data) {
        setUser(response.data.username); // Fix: Use response.data.username
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username); // Fix: Store correct username
        navigate("/questions"); // Redirect to questions page
      } else {
        throw new Error("Invalid response format from server.");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        alert(
          error.response.data?.message ||
            "Invalid credentials. Please try again."
        );
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className={classes.login_form_container}>
      <div className={classes.login_info}>
        <p>Please log in to your account first</p>
      </div>
      <h2 className={classes.login_form_heading}>Login to Your Account</h2>
      <p className={classes.login_form_text}>
        Don't have an account?{" "}
        <a href="#" className={classes.login_form_link} onClick={onToggleForm}>
          Create a new account
        </a>
      </p>

      <form className={classes.login_form} onSubmit={handleLogin}>
        <input
          type="email"
          id="email"
          placeholder="Email address"
          className={classes.login_form_input}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div style={{ position: "relative" }}>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            placeholder="Password"
            className={classes.login_form_input}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={togglePasswordVisibility}
            className={classes.password_toggle_icon}
          >
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
          </span>
        </div>
        <p className={classes.login_form_text}>
          <a href="#" className={classes.login_form_link}>
            Forgot password?
          </a>
        </p>
        <button type="submit" className={classes.login_form_button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login_Form;
