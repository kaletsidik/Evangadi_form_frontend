import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./question_ask.module.css";
import axios from "../../axiosConfig";

const Question_ask = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDetail, setQuestionDetail] = useState("");
  const navigate = useNavigate();

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to post a question.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "/questions/all-questions",
        { title: questionTitle, description: questionDetail, tag: "General" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Response data:", response.data); // Debugging log
      if (response.data.id) {
        navigate(`/questions/${response.data.id}`); // Redirects to Answer.js with the new question ID
      } else {
        alert("Question posted, but ID is missing. Redirecting to home.");
        navigate("/questions/all-questions");
      }
    } catch (error) {
      console.error("Error posting question:", error.response || error.message);
      alert("Failed to post question.");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.form_wrapper}>
        <h1 className={classes.heading}>Steps To Write A Good Question</h1>
        <ul className={classes.guidelines}>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it here.</li>
        </ul>

        <h2 className={classes.sub_heading}>Post Your Question</h2>
        <form onSubmit={handleQuestionSubmit}>
          <input
            className={classes.input_field}
            placeholder="Question title"
            type="text"
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
            required
          />
          <textarea
            className={classes.textarea_field}
            placeholder="Question detail..."
            value={questionDetail}
            onChange={(e) => setQuestionDetail(e.target.value)}
            required
          ></textarea>
          <button className={classes.submit_button} type="submit">
            Post Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default Question_ask;
