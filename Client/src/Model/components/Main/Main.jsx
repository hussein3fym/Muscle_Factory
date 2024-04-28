import React, { useState, useEffect, useContext } from "react";
import "./Main.css";
import SideBar from "../SideBar/SideBar";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
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

  const [showForm, setShowForm] = useState(false);

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [goal, setGoal] = useState("maintain weight");
  const [numMeals, setNumMeals] = useState("3");
  const { updateInputAndSendData } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      Age: age,
      Weight: weight,
      Height: height,
      Gender: gender,
      ActivityLevel: activityLevel,
      Goal: goal,
      NumMeals: numMeals,
    };

    const promptWithArray = `This is my data and my goal, make me a diet plan and make the answer brief \n
    ${Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")}`;

    console.log(promptWithArray); // Make sure this logs correctly
    updateInputAndSendData(promptWithArray);

    // Hide the form after submitting
    setShowForm(false);
  };

  const [showFormExercise, setShowFormExercise] = useState(false);

  const [restDays, setRestDays] = useState("3 days");
  const [bodyGoal, setBodyGoal] = useState("maintain weight");
  const [trainStyle, setTrainStyle] = useState("pushPullLeg");
  const [unpreferredTrain, setUnpreferredTrain] = useState("");

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
  };

  useEffect(() => {
    const handleSend = () => {
      onSent(); // Call the function to send data.
    };

    // Only set the timer if there is actual input to send.
    if (input.trim()) {
      const timer = setTimeout(handleSend, 3000); // Delay the execution by 3 seconds.
      return () => clearTimeout(timer); // Cleanup the timer on unmount or when input changes.
    }

    if (resultData) {
      setShowInputField(true);
    }
  }, [input, resultData]);

  const handleCardClick = () => {
    setShowForm((prevState) => !prevState); // Toggle the state to show/hide the form
  };
  const handleCardClickExercise = () => {
    setShowFormExercise((prevState) => !prevState); // Toggle the state to show/hide the form
  };

  const [showQuestionCard, setShowQuestionCard] = useState(false);
  const [showInputField, setShowInputField] = useState(false);

  const handleQuestionCardClick = () => {
    setShowQuestionCard(true);
  };

  return (
    <>
      {/* <SideBar /> */}
      <div className="m-main">
        <div className="m-nav">
          <img src={assets.logoM} alt="" className="m-logo" />
          <img src={assets.user_icon} alt="" className="m-Icon" />
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
                  <img src={assets.compass_icon} alt="" className="m-Icon" />
                </div>
                <div className="m-card" onClick={handleCardClickExercise}>
                  <p>Need an excersice plan ?</p>
                  <img src={assets.compass_icon} alt="" className="m-Icon" />
                </div>
                <div className="m-card" onClick={handleQuestionCardClick}>
                  <p>Do you have a question ?</p>
                  <img src={assets.question_icon} alt="" className="m-Icon" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="m-result">
                {prevPrompts.slice(0, -1).map((prevPrompt, index) => (
                  <div key={index}>
                    <div className="m-result-title">
                      <img src={assets.user_icon} alt="" />
                      <p>{prevPrompt}</p>
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
                  <img src={assets.user_icon} alt="" />
                  <p>{recentPrompt}</p>
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
                className="m-search-input"
              />
            </div>
            {/* <p className="bottom-info">
              This model may display inaccurate info, including info about newer
              medicine references, so double-check its response
            </p> */}
          </div>
        </div>
      </div>

      {/* Pop-up Form */}
      {showForm && (
        <div className="popup-form">
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
                <option value="male">Male</option>
                <option value="female">Female</option>
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
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="very active">Very Active</option>
                <option value="extra active">Extra Active</option>
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
                <option value="lose weight">Lose Weight</option>
                <option value="maintain weight">Maintain Weight</option>
                <option value="build muscles">Build Muscles</option>
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
        <div className="popup-form">
          <form
            id="form"
            className="m-form-container"
            onSubmit={handleSubmitExercise}
          >
            {/* Form inputs */}

            {/* Rest Days */}
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
                value={goal}
                onChange={(e) => setTrainStyle(e.target.value)}
                name="trainStyle"
                id="trainStyle"
              >
                <option value="recommend Train">Recommend </option>
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
