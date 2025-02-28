import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./answer.module.css";
import axios from "../../axiosConfig";

const Answer = () => {
  const { id } = useParams(); // Get question ID from URL
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchQuestion = async () => {
    try {
      // console.log("Fetching question:", id);
      const token = localStorage.getItem("token");
      const response = await axios.get(`/questions/questions`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log("Fetched questions:", response.data); // Log the fetched questions

      // Find the specific question that matches the ID
      const foundQuestion = response.data.find((q) => q.questionid === id);

      if (foundQuestion) {
        setQuestion(foundQuestion);
      } else {
        // console.error("Question not found for ID:", id);
      }
    } catch (error) {
      console.error(
        "Error fetching question:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchAnswers = async (questionId) => {
    try {
      const response = await axios.get(`/answers/answers/${questionId}`);
      // console.log("Fetched answers:", response.data); // Debugging
      if (Array.isArray(response.data)) {
        // Set answers directly without sorting
        setAnswers(response.data);
      } else {
        console.error("Unexpected data format:", response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching answers:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  useEffect(() => {
    if (question) {
      fetchAnswers(question.questionid); // Fetch answers only when question is set
    }
  }, [question]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (newAnswer.trim() === "") return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in to post an answer.");
      return;
    }

    const username = localStorage.getItem("username") || "Guest";

    try {
      const response = await axios.post(
        "/answers/answer",
        { questionid: id, answer: newAnswer }, // Match API key
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Posted answer response:", response.data);

      // Add new answer in the correct format
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        { answer: newAnswer, username: username, createdAt: new Date() },
      ]);
      navigate("/questions"); // Redirect back to the question page
      setNewAnswer(""); // Clear input after submission
    } catch (error) {
      console.error(
        "Error posting answer:",
        error.response?.data || error.message
      );
      alert("Failed to post the answer. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading question...</p>;
  }

  return (
    <div className={classes.answerContainer}>
      <div className={classes.questionHeader}>
        <h2 className={classes.questionCategory}>QUESTION</h2>
      </div>
      {question ? (
        <>
          <h1 className={classes.questionTitle}>{question.title}</h1>
          <p className={classes.questionText}>{question.description}</p>
        </>
      ) : (
        <p>Question not found.</p>
      )}

      <div className={classes.answerSection}>
        <h2 className={classes.answerTitle}>Answers From The Community</h2>
        <div className={classes.answerCard}>
          {answers.length > 0 ? (
            answers.map((answer, index) => (
              <div key={index} className={classes.answerItem}>
                <p>{answer.answer}</p>
                <p className={classes.answerUser}>
                  Answered by:{" "}
                  <span className={classes.username}>
                    {answer.username || "Anonymous"}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p>No answers yet. Be the first to answer!</p>
          )}
        </div>

        <div className={classes.answerCard}>
          <textarea
            className={classes.answerInput}
            placeholder="Your answer ..."
            rows="4"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          ></textarea>
          <button
            className={classes.postAnswerButton}
            onClick={handleAnswerSubmit}
          >
            Post Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Answer;
