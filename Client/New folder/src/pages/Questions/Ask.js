import React, { useState } from "react";

const Ask = () => {
  const [question, setQuestion] = useState({
    question: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted question:", question.question);
    // Clear the input field after submission
    setQuestion({ question: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1> Ask a question?..</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="question"
            placeholder="Put your Question..."
            value={question.question}
            onChange={handleChange}
          />
          <button type="submit">Go ahead</button>
        </div>
      </form>
    </div>
  );
};

export default Ask;
