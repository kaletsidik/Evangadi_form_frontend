import React, { useState } from "react";
import LoginForm from "../Login/Login_Form";
import RegisterForm from "../Register/Register_Form";
import Home from "../Home/Home";
import classes from "./auth.module.css";

const AuthContainer = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  const registerUser = (newUser) => {
    setRegisteredUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className={classes.header_container}>
      <Home />
      <div className={classes.auth_container}>
        {isLogin ? (
          <LoginForm
            onToggleForm={toggleForm}
            setUser={setUser}
            registeredUsers={registeredUsers}
          />
        ) : (
          <RegisterForm onToggleForm={toggleForm} registerUser={registerUser} />
        )}
      </div>
    </div>
  );
};

export default AuthContainer;
