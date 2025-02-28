import React, { useState } from "react";
import classes from "./register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

const Register_Form = ({ onToggleForm }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const Navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newUser = { username, firstname, lastname, email, password };

    try {
      const response = await axios.post("/users/register", newUser);
      console.log(response);

      if (response.status === 201) {
        Navigate("/questions"); // Navigate to question page after registration
        setUserName("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error.response);
      setError(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Join the Network</h2>
      <p className={classes.subheading}>
        Already have an account?{" "}
        <a href="#" onClick={onToggleForm}>
          Sign in
        </a>
      </p>
      <form className={classes.form} onSubmit={handleRegister}>
        {error && <p className={classes.error}>{error}</p>}
        <input
          type="text"
          id="username"
          placeholder="username"
          required
          className={classes.input}
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />

        <div className={classes.input_names}>
          <input
            type="text"
            id="firstName"
            placeholder="First name"
            required
            className={classes.fname}
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            id="lastName"
            placeholder="Last name"
            required
            className={classes.Lname}
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <input
          type="email"
          id="email"
          placeholder="Email address"
          required
          className={classes.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ position: "relative" }}>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            placeholder="Password"
            required
            className={classes.input}
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
        <p className={classes.agreement}>
          I agree to the <a href="#">privacy policy</a> and
          <a href="#">terms of service.</a>
        </p>
        <button type="submit" className={classes.button}>
          Agree and Join
        </button>
        <p className={classes.account}>Already have an account</p>
      </form>
    </div>
  );
};

export default Register_Form;
