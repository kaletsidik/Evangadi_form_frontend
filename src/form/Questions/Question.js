import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./question.module.css";
import axios from "../../axiosConfig";

const Question = () => {
  const [questions, setQuestions] = useState([]); // All questions
  const [filteredQuestions, setFilteredQuestions] = useState([]); // Filtered search results
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(2); // Show only 2 questions initially
  const [username, setUsername] = useState(""); // Set username state
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState(""); // Error handling state

  const navigate = useNavigate();

  useEffect(() => {
    // Get username from localStorage when the component mounts
    const savedUsername = localStorage.getItem("username");
    setUsername(savedUsername || "Guest"); // Set the username from localStorage or default to Guest
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        setError("No token found. Please log in.");
        navigate("/login"); // Redirect to login page if no token
        return; // Early return to prevent further execution
      }

      try {
        const response = await axios.get("questions/questions", {
          headers: { Authorization: `Bearer ${token}` }, // Attach token in request
        });

        // Set questions directly without sorting
        setQuestions(response.data);
        setFilteredQuestions(response.data);
      } catch (error) {
        setError("Error fetching questions.");
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetching
      }
    };

    fetchQuestions();
  }, [navigate]);

  useEffect(() => {
    if (search === "") {
      setFilteredQuestions(questions); // Reset search results if no search term
    } else {
      setFilteredQuestions(
        questions.filter((question) =>
          question.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, questions]); // Filter when either search or questions change

  if (loading) {
    return <p>Loading questions...</p>; // Loading state while fetching data
  }

  return (
    <main className={classes.container}>
      <div className={classes.card}>
        <div className={classes.header}>
          <button
            className={classes.ask_Button}
            onClick={() => navigate("/ask")}
          >
            Ask Question
          </button>
          <div className={classes.welcome_Text}>
            Welcome: <span className={classes.username}>{username}</span>
          </div>
        </div>
        <div className={classes.search_Bar}>
          <input
            type="text"
            placeholder="Search all questions"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        {error && <p className={classes.error}>{error}</p>}{" "}
        {/* Show error message */}
        <div className={classes.question_List}>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.slice(0, visibleCount).map((question) => (
              <div
                key={question.questionid}
                className={classes.question_Item}
                onClick={() => navigate(`/questions/${question.questionid}`)}
              >
                <div className={classes.user_Info}>
                  <img
                    src="https://storage.googleapis.com/a1aa/image/3IhbfwHE1CaFIbqIfg5iH-SXiFbYf48BgkA-0YkssAY.jpg"
                    alt="User  avatar"
                    className={classes.avatar}
                  />
                  <div>
                    <div className={classes.username}>
                      {question.username ? question.username : "Anonymous"}{" "}
                    </div>
                  </div>
                </div>
                <div className={classes.question_Title}>{question.title}</div>
                <i className="fas fa-chevron-right"></i>
              </div>
            ))
          ) : (
            <p>No questions found for this search.</p>
          )}
        </div>
        {/* Show More / Show Less Buttons */}
        {filteredQuestions.length > 2 && (
          <div className={classes.showMoreContainer}>
            {visibleCount < filteredQuestions.length ? (
              <button
                className={classes.showMoreButton}
                onClick={() => setVisibleCount(filteredQuestions.length)}
              >
                Show More
              </button>
            ) : (
              <button
                className={classes.showMoreButton}
                onClick={() => setVisibleCount(2)}
              >
                Show Less
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Question;
