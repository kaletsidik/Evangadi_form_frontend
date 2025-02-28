import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login_Form from "./form/Login/Login_Form";
import Question from "./form/Questions/Question";
import AuthContainer from "./form/Auth/AuthContainer";
import Question_ask from "./form/Questions/Question_ask";
import Footer from "./form/Footer/Footer";
import Header from "./form/Header/Header";
import Answer from "./form/Answers/Answer";
import axios from "./axiosConfig";
import Fourfor from "./form/Fourfor/Fourfor";
function App() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();

  async function checkUser() {
    try {
      const response = await axios.get("users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Full response:", response.data); //
      // console.log("User ID:", response.data?.userid);
      // console.log("Username:", response.data?.username);
      setUser(response.data);
    } catch (error) {
      console.error("Authentication failed:", error.response);
      Navigate("/");
    }
  }

  useEffect(() => {
    if (token) {
      checkUser();
    } else {
      Navigate("/");
    }
  }, [Navigate]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<AuthContainer setUser={setUser} />} />
        <Route path="/login" element={<Login_Form setUser={setUser} />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/ask" element={<Question_ask />} />
        <Route path="/questions/:id" element={<Answer />} />
        <Route path="*" element={<Fourfor />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
