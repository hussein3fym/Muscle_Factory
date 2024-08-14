//I WAS HERE BEFORE CHANGING

import React, { useState } from 'react';
import axios from 'axios';

const Rec = () => {
  const [formData, setFormData] = useState({
    Age: '',
    'Weight(kg)': '',
    'Height(cm)': '',
    Gender: '',
    'Activity Level': '',
    preference: 'all',
    num_meals: 3,
  });
  const [prediction, setPrediction] = useState(null);
  const [recommendedMeals, setRecommendedMeals] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(response.data.prediction);
      setRecommendedMeals(response.data.recommended_meals);
      setError(null); // Reset error state
      console.log('Prediction:', response.data.prediction);
      console.log('Recommended Meals:', response.data.recommended_meals);
    } catch (error) {
      setPrediction(null);
      setRecommendedMeals(null);
      setError('An error occurred while processing your request.'); // Set error state
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Submit Data to Flask Server</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input type="number" name="Age" value={formData.Age} onChange={handleChange} />
        </label><br></br>
        <label>
          Weight (kg):
          <input type="number" name="Weight(kg)" value={formData['Weight(kg)']} onChange={handleChange} />
        </label><br></br>
        <label>
          Height (cm):
          <input type="number" name="Height(cm)" value={formData['Height(cm)']} onChange={handleChange} />
        </label><br></br>
        <label>
          Gender:
          <input type="text" name="Gender" value={formData.Gender} onChange={handleChange} />
        </label><br></br>
        <label>
          Activity Level:
          <input type="text" name="Activity Level" value={formData['Activity Level']} onChange={handleChange} />
        </label><br></br>
        <label>
          Preference:
          <select name="preference" value={formData.preference} onChange={handleChange}>
            <option value="all">All</option>
            <option value="vegan">Vegan</option>
            <option value="non-vegan">Non-Vegan</option>
          </select>
        </label><br></br>
        <label>
          Number of Meals:
          <select name="num_meals" value={formData.num_meals} onChange={handleChange}>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label><br></br>
        <button type="submit">Submit</button>
      </form>
      {prediction && (
        <div>
          <h2>Predicted BMR: {prediction}</h2>
        </div>
      )}
      {recommendedMeals && (
        <div>
          <h2>Recommended Meals:</h2>
          <ul>
            {recommendedMeals.map((meal, index) => (
              <li key={index}>{meal.name}: {meal.calories} Calories</li>
            ))}
          </ul>
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Rec;


// import React, { useState } from 'react';
// import axios from 'axios';

// function Rec() {
//   const [formData, setFormData] = useState({
//     Age: '',
//     'Weight(kg)': '',
//     'Height(cm)': '',
//     Gender: '',
//     'Activity Level': '',
//     preference: 'all',
//     num_meals: 3,
//   });
//   const [prediction, setPrediction] = useState(null);
//   const [recommendedMeals, setRecommendedMeals] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Axios request with CORS handling
//       const predictionResponse = await axios.post('http://localhost:5000/predict', formData, {
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Content-Type': 'application/json',
//         },
//       });
//       const mealsResponse = await axios.post('http://localhost:5000/predict', formData, {
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Content-Type': 'application/json',
          
//         },
//       });

//       // Check if response data exists before accessing it
//       if (predictionResponse.data && mealsResponse.data) {
//         setPrediction(predictionResponse.data.prediction);
//         setRecommendedMeals(mealsResponse.data.recommended_meals);
//       } else {
//         setError('Error: Empty response data');
//       }
//     } catch (error) {
//       // Handle errors
//       setError(error.response?.data?.error || 'An unexpected error occurred');
      
//     }
//     console.log(recommendedMeals)
//   };


//   return (
//     <div>
//       <h1>Predict BMR and Recommend Meals</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Age:
//           <input type="number" name="Age" value={formData.Age} onChange={handleChange} />
//         </label>
//         <label>
//           Weight (kg):
//           <input type="number" name="Weight(kg)" value={formData['Weight(kg)']} onChange={handleChange} />
//         </label>
//         <label>
//           Height (cm):
//           <input type="number" name="Height(cm)" value={formData['Height(cm)']} onChange={handleChange} />
//         </label>
//         <label>
//           Gender:
//           <input type="text" name="Gender" value={formData.Gender} onChange={handleChange} />
//         </label>
//         <label>
//           Activity Level:
//           <input type="text" name="Activity Level" value={formData['Activity Level']} onChange={handleChange} />
//         </label>
//         <label>
//           Preference:
//           <select name="preference" value={formData.preference} onChange={handleChange}>
//             <option value="all">All</option>
//             <option value="vegan">Vegan</option>
//             <option value="non-vegan">Non-Vegan</option>
//           </select>
//         </label>
//         <label>
//           Number of Meals:
//           <select name="num_meals" value={formData.num_meals} onChange={handleChange}>
//             <option value="3">3</option>
//             <option value="4">4</option>
//             <option value="5">5</option>
//           </select>
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//       {prediction && <div>Predicted BMR: {prediction}</div>}
//       {recommendedMeals && (
//         <div>
//           <h2>Recommended Meals:</h2>
//           {recommendedMeals.map((meal, index) => (
//             <div key={index}>
//               <p>Calories: {meal.Calories}</p>
//               <p>Type: {meal.Type}</p>
//               <p>Breakfast: {meal.Breakfast}</p>
//               <p>Lunch: {meal.Lunch}</p>
//               <p>Dinner: {meal.Dinner}</p>
//               {meal.Snack && <p>Snack: {meal.Snack}</p>}
//               {meal['Snack.1'] && <p>Snack: {meal['Snack.1']}</p>}
//               <hr />
//             </div>
//           ))}
//         </div>
//       )}
//       {error && <div>Error: {error}</div>}
//     </div>
//   );
// }

// export default Rec;

// // import React, { useState } from 'react';
// // import axios from 'axios';

// // function Rec() {
// //   const [formData, setFormData] = useState({
// //     Age: '',
// //     'Weight(kg)': '',
// //     'Height(cm)': '',
// //     Gender: '',
// //     'Activity Level': '',
// //     preference: 'all',
// //     num_meals: 3,
// //   });
// //   const [prediction, setPrediction] = useState(null);
// //   const [recommendedMeals, setRecommendedMeals] = useState(null);
// //   const [error, setError] = useState(null);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const predictionResponse = await axios.post('http://localhost:5000/predict', formData);
// //       const mealsResponse = await axios.post('http://localhost:5000/predict', formData);

// //       // Check if response data exists before accessing it
// //       if (predictionResponse.data && mealsResponse.data) {
// //         setPrediction(predictionResponse.data.prediction);
// //         setRecommendedMeals(mealsResponse.data.recommended_meals);
// //       } else {
// //         setError('Error: Empty response data');
// //       }
// //     } catch (error) {
// //       // Handle errors
// //       setError(error.response?.data?.error || 'An unexpected error occurred');
// //     }
// //   };


// //   return (
// //     <div>
// //       <h1>Predict BMR and Recommend Meals</h1>
// //       <form onSubmit={handleSubmit}>
// //         <label>
// //           Age:
// //           <input type="number" name="Age" value={formData.Age} onChange={handleChange} />
// //         </label>
// //         <label>
// //           Weight (kg):
// //           <input type="number" name="Weight(kg)" value={formData['Weight(kg)']} onChange={handleChange} />
// //         </label>
// //         <label>
// //           Height (cm):
// //           <input type="number" name="Height(cm)" value={formData['Height(cm)']} onChange={handleChange} />
// //         </label>
// //         <label>
// //           Gender:
// //           <input type="text" name="Gender" value={formData.Gender} onChange={handleChange} />
// //         </label>
// //         <label>
// //           Activity Level:
// //           <input type="text" name="Activity Level" value={formData['Activity Level']} onChange={handleChange} />
// //         </label>
// //         <label>
// //           Preference:
// //           <select name="preference" value={formData.preference} onChange={handleChange}>
// //             <option value="all">All</option>
// //             <option value="vegan">Vegan</option>
// //             <option value="non-vegan">Non-Vegan</option>
// //           </select>
// //         </label>
// //         <label>
// //           Number of Meals:
// //           <select name="num_meals" value={formData.num_meals} onChange={handleChange}>
// //             <option value="3">3</option>
// //             <option value="4">4</option>
// //             <option value="5">5</option>
// //           </select>
// //         </label>
// //         <button type="submit">Submit</button>
// //       </form>
// //       {prediction && <div>Predicted BMR: {prediction}</div>}
// //       {recommendedMeals && (
// //         <div>
// //           <h2>Recommended Meals:</h2>
// //           {recommendedMeals.map((meal, index) => (
// //             <div key={index}>
// //               <p>Calories: {meal.Calories}</p>
// //               <p>Type: {meal.Type}</p>
// //               <p>Breakfast: {meal.Breakfast}</p>
// //               <p>Lunch: {meal.Lunch}</p>
// //               <p>Dinner: {meal.Dinner}</p>
// //               {meal.Snack && <p>Snack: {meal.Snack}</p>}
// //               {meal['Snack.1'] && <p>Snack: {meal['Snack.1']}</p>}
// //               <hr />
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //       {error && <div>Error: {error}</div>}
// //     </div>
// //   );
// // }

// // export default Rec;
