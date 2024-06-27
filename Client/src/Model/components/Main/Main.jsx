import React, { useState, useEffect, useContext } from "react";
import "./Main.css";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const UserId = storedUser ? storedUser.userId : null;
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (UserId) {
      axios
        .get(`https://localhost:7095/api/Users/GetUser/${UserId}`)
        .then((res) => {
          setUser(res.data);
          console.log("Fetched Trainer Data:", res.data);
        })
        .catch((error) => console.error("Error fetching trainer:", error));
    }
  }, [UserId]);
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    prevPrompts,
    prevResults,
  } = React.useContext(Context);

  // Declare form of user's nutrition data
  const [showForm, setShowForm] = useState(false);

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [type, setType] = useState("non-vegan");
  const [goal, setGoal] = useState("maintain weight");
  const [numMeals, setNumMeals] = useState("3");
  const { updateInputAndSendData } = useContext(Context);

  const [handleSubmitCalled, setHandleSubmitCalled] = useState(false);
  const [handleSubmitExerciseCalled, setHandleSubmitExerciseCalled] =
    useState(false);

  // Handel submit button of nutrition form
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    let promptWithArray; // Declare promptWithArray here

    try {
      const formData = {
        // Provide user data here, for example:
        Age: age,
        "Weight(kg)": weight,
        "Height(cm)": height,
        "Activity Level": activityLevel,
        Gender: gender,
        Goal: goal,
        preference: type,
        num_meals: numMeals,
      };
      console.log(formData);
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const promptArray = [
        {
          prediction: data.prediction,
          recommendedMeals: data.recommended_meals,
        },
      ];

      promptWithArray = promptArray
        .map(
          (item) =>
            `This is my BMR and meals i should eat but i want you to provide the quantities in grams and time of these meals and make the answer brief\nPrediction: ${
              item.prediction
            }\nRecommended Meals: ${JSON.stringify(item.recommendedMeals)}`
        )
        .join("\n\n");

      console.log(promptWithArray); // Make sure this logs correctly

      updateInputAndSendData(promptWithArray);
      setShowForm(false);
      setHandleSubmitCalled(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Declare form of user's exercise data
  const [showFormExercise, setShowFormExercise] = useState(false);

  const [restDays, setRestDays] = useState("3 days");
  const [bodyGoal, setBodyGoal] = useState("maintain weight");
  const [trainStyle, setTrainStyle] = useState("recommend style");
  const [unpreferredTrain, setUnpreferredTrain] = useState("");

  // Handel submit button of exercise form
  const handleSubmitExercise = (e) => {
    setShowFormExercise(false);
    e.preventDefault();

    const formDataExercise = {
      Days: restDays,
      BodyGoal: bodyGoal,
      TrainStyle: trainStyle,
      UnpreferredTrain: unpreferredTrain,
    };

    const promptWithArrayExercise = `This is my data and my goal, make me a complete workout plan for days I entered
     and make the answer brief \n${Object.entries(formDataExercise)
       .map(([key, value]) => `${key}: ${value}`)
       .join("\n")}`;

    console.log(promptWithArrayExercise); // Make sure this logs correctly
    updateInputAndSendData(promptWithArrayExercise);

    // Hide the form after submitting
    setShowForm(false);
    setHandleSubmitExerciseCalled(true);
  };

  const checkRecentPrompt = (prompt) => {
    // Check if either handleSubmit or handleSubmitExercise is called
    if (handleSubmitCalled) {
      // Check if the recentPrompt corresponds to the nutrition form
      if (
        prompt.includes(
          "This is my BMR and meals i should eat but i want you to provide the quantities in grams and time of these meals and make the answer brief"
        )
      ) {
        return ""; // Hide the recentPrompt for the nutrition form
      }
    } else if (handleSubmitExerciseCalled) {
      // Check if the recentPrompt corresponds to the exercise form
      if (prompt.includes("complete workout plan")) {
        return ""; // Hide the recentPrompt for the exercise form
      }
    }

    // If neither handleSubmit nor handleSubmitExercise is called, or if the prompt does not match either form, return the prompt as is
    return prompt;
  };

  const checkRecentPromptImg = (prompt) => {
    // Check if either handleSubmit or handleSubmitExercise is called
    if (handleSubmitCalled) {
      // Check if the recentPrompt corresponds to the nutrition form
      if (
        prompt.includes(
          "This is my BMR and meals i should eat but i want you to provide the quantities in grams and time of these meals and make the answer brief"
        )
      ) {
        return true; // Hide the user icon
      }
    } else if (handleSubmitExerciseCalled) {
      // Check if the recentPrompt corresponds to the exercise form
      if (prompt.includes("complete workout plan")) {
        return true; // Hide the user icon
      }
    }
    return false; // Show the user icon
  };

  useEffect(() => {
    const handleSend = () => {
      onSent(); // Call the function to send data.
    };
    if (resultData) {
      setShowInputField(true);
    }
  }, [input, resultData]); // Only re-run the effect if 'input' changes.

  const handleCardClick = () => {
    setShowForm((prevState) => {
      setShowFormExercise(false); // Hide the exercise form when showing the nutrition form
      return !prevState; // Toggle the state to show/hide the nutrition form
    });
  };
  const handleCardClickExercise = () => {
    setShowFormExercise((prevState) => {
      setShowForm(false); // Hide the nutrition form when showing the exercise form
      return !prevState; // Toggle the state to show/hide the exercise form
    });
  };

  const handleQuestionCardClick = () => {
    setShowForm(false); // Hide the nutrition form
    setShowFormExercise(false); // Hide the exercise form
    setShowQuestionCard(true); // Show the question card
  };

  const [showQuestionCard, setShowQuestionCard] = useState(false);
  const [showInputField, setShowInputField] = useState(false);

  return (
    <>
      <div className="m-main">
        <div className="m-nav">
          <img src={assets.logoM} alt="" className="m-logo" />
        </div>
        <div className="m-main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p>
                  <span>Hello</span>
                </p>
                <p>How can I help you Today?</p>
              </div>
              <div className="m-cards">
                <div className="m-card" onClick={handleCardClick}>
                  <p>Need a diet plan ? Enter your data !!</p>
                  <img src={assets.nutrition_icon} alt="" className="m-Icon" />
                </div>
                <div className="m-card" onClick={handleCardClickExercise}>
                  <p>Need an excersice plan ?</p>
                  <img src={assets.workout} alt="" className="m-Icon" />
                </div>
                <div className="m-card" onClick={handleQuestionCardClick}>
                  <p>Do you have a question ?</p>
                  <img src={assets.ask} alt="" className="m-Icon" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="m-result">
                {prevPrompts.slice(0, -1).map((prevPrompt, index) => (
                  <div key={index}>
                    <div className="m-result-title">
                      {user.photo ? (
                        <img
                          src={`data:image/jpg;base64,${user.photo}`}
                          alt="User Profile"
                          style={{
                            width: 40,
                            height: 40,
                            display: checkRecentPromptImg(prevPrompt)
                              ? "none"
                              : "block",
                          }}
                          className="U-ProfileImg"
                        />
                      ) : (
                        <div>
                          <CgProfile
                            style={{ color: "white", fontSize: "4rem" }}
                            className="U-ProfileIcon"
                          />
                        </div>
                      )}
                      <p>{checkRecentPrompt(prevPrompt)}</p>
                    </div>
                    <div className="m-result-data">
                      <img src={assets.musclesfactory_Icon} alt="" />
                      {
                        <p
                          dangerouslySetInnerHTML={{
                            __html: prevResults[index],
                          }}
                        ></p>
                      }
                    </div>
                  </div>
                ))}

                <div className="m-result-title">
                  {user.photo ? (
                    <img
                      src={`data:image/jpg;base64,${user.photo}`}
                      alt="User Profile"
                      style={{
                        width: 40,
                        height: 40,
                        display: checkRecentPromptImg(recentPrompt)
                          ? "none"
                          : "block",
                      }}
                      className="U-ProfileImg"
                    />
                  ) : (
                    <div>
                      <CgProfile
                        style={{ color: "white", fontSize: "4rem" }}
                        className="U-ProfileIcon"
                      />
                    </div>
                  )}
                  <p> {checkRecentPrompt(recentPrompt)}</p>
                </div>
                <div className="m-result-data">
                  <img src={assets.musclesfactory_Icon} alt="" />
                  {loading ? (
                    <div className="m-loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  ) : (
                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="m-main-bottom">
            <div className="m-search-box">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="What is your question ?!"
                style={{
                  display:
                    showQuestionCard || showInputField ? "block" : "none",
                }}
              />
              <div>
                {input.trim() && (
                  <button disabled={loading} onClick={() => onSent()}>
                    <img src={assets.red_arrow} alt="" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Form */}
      {showForm && (
        <div>
          <form id="form" className="m-form-container" onSubmit={handleSubmit}>
            {/* Form inputs */}
            {/* Age */}
            <label>
              Age:
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                type="number"
                name="age"
                id="age"
              />
            </label>
            {/* Weight */}
            <label>
              Weight(kg):
              <input
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                type="number"
                name="weight"
                id="weight"
              />
            </label>
            {/* Height */}
            <label>
              Height(cm):
              <input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                type="number"
                name="height"
                id="height"
              />
            </label>
            {/* Gender */}
            <label>
              Gender:
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                type="number"
                name="gender"
                id="gender"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            {/* Activity level */}
            <label>
              Activity Level:
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                name="activityLevel"
                id="activityLevel"
              >
                <option value="Sedentary">Little to no exercise</option>
                <option value="Light"> Exercise 1-3 days a week </option>
                <option value="Moderate">Exercise 3-5 days a week </option>
                <option value="Very Active">Exercise 6-7 days a week </option>
                <option value="Extra Active">Exercise 7 days a week </option>
              </select>
            </label>
            {/* Type of Food */}
            <label>
              Type of food :
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                name="type"
                id="type"
              >
                <option value="vegan">Vegan</option>
                <option value="non-vegan">Non Vegan</option>
              </select>
            </label>
            {/* Goal */}
            <label>
              Goal:
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                name="goal"
                id="goal"
              >
                <option value="loseWeight">Lose Weight</option>
                <option value="maintain weight">Maintain Weight</option>
                <option value="gainWeight">Build Muscles</option>
              </select>
            </label>
            <label>
              Number of Meals
              <select
                value={numMeals}
                onChange={(e) => setNumMeals(e.target.value)}
                name="numMeals"
                id="numMeals"
              >
                <option value="3">3 Meals</option>
                <option value="4">4 Meals</option>
                <option value="5">5 Meals</option>
              </select>
            </label>
            <button type="submit">Submit</button>
            <button onClick={handleCardClick}>Cancel</button>
          </form>
        </div>
      )}

      {showFormExercise && (
        <div>
          <form
            id="form"
            className="m-form-container"
            onSubmit={handleSubmitExercise}
          >
            <label>
              Avaialble Days:
              <select
                value={restDays}
                onChange={(e) => setRestDays(e.target.value)}
                name="restDays"
                id="restDays"
              >
                <option value="3 days">3 Days</option>
                <option value="4 days">4 Days</option>
                <option value="5 days">5 Days</option>
              </select>
            </label>
            {/* Body Goal */}
            <label>
              Body Goal:
              <select
                value={bodyGoal}
                onChange={(e) => setBodyGoal(e.target.value)}
                name="bodyGoal"
                id="bodyGoal"
              >
                <option value="lose weight">Lose Weight</option>
                <option value="maintain weight">Maintain Weight</option>
                <option value="build muscles">Build Muscles</option>
              </select>
            </label>
            {/* Training Style */}
            <label>
              Training Style:
              <select
                value={trainStyle}
                onChange={(e) => setTrainStyle(e.target.value)}
                name="trainStyle"
                id="trainStyle"
              >
                <option value="recommend style">Recommend </option>
                <option value="pushPullLeg">Push Pull Leg </option>
                <option value="arnold">Arnold Split</option>
                <option value="upperLower">Upper-Lower Split</option>
                <option value="fullBody">Full-Body Training</option>
                <option value="bro">Bro-Split</option>
              </select>
            </label>
            <label>
              Unpreferred Exercise:
              <input
                value={unpreferredTrain}
                onChange={(e) => setUnpreferredTrain(e.target.value)}
                required
                type="text"
                name="unpreferred"
                id="unpreferred"
              />
            </label>
            <button type="submit">Submit</button>
            <button onClick={handleCardClickExercise}>Cancel</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Main;
