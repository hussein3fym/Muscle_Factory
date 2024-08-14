import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// import * as info from './info.js';

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyBbkihA7GhG-tBcIdSsuhcub9B3W-EdliM";

async function runChat(prompt) {
  // Check if the question is related to gym and nutrition fields
  const isDietQuestion = (question) => {
    const dietKeywords = ["Hello", "Hola", "Hey", "Hi", "tip", "tips","Basal metabolic rate ","BMR","Basal metabolic index","BMI", "Breakfast", "Lunch", "Dinner", "Snack", "Snacks", "Drinks", "Drink", "Question", "How", "diet", "nutrition", "meal plan", "gym", "gymnastics", "fitness", "plan", "bodybuilding", "exercise", "workout", "training", "weightlifting", "strength", "muscle", "protein", "carbohydrate", "calorie","calories", "healthy", "athlete", "athletic", "body composition", "macros", "micros", "supplements", "vitamins", "minerals", "macros", "dietary", "nutrient", "hydration", "hydration", "flexibility", "endurance", "aerobic", "anaerobic", "metabolism", "burn fat", "build muscle", "lean muscle", "core strength", "cardio", "recovery", "stamina", "agility", "powerlifting", "crossfit", "bodyweight exercise", "HIIT", "plyometrics", "functional training", "kettlebell", "barbell", "dumbbell", "weight machine", "treadmill", "elliptical", "rowing machine", "stationary bike", "exercise ball", "medicine ball", "resistance band", "TRX", "brand", "name", "coach", "player", "line", "Coleman", "Arnold", "famous", "celebrity", "icon", "legend", "hero", "champion", "winner", "trainer", "instructor", "expert", "specialist", "pro", "alternative", "alternate", "different", "substitute", "option", "backup", "second choice", "another", "solution", "variation", "replacement", "zinc", "multivitamins", "medicines"
      , "vitamin A", "vitamin B", "vitamin C", "vitamin D", "vitamin E", "vitamin K", "thiamine", "riboflavin", "niacin", "pantothenic acid", "pyridoxine", "biotin", "folic acid", "cobalamin", "ascorbic acid", "calciferol", "tocopherol", "phytonadione"
      , "protein", "carbohydrate", "fat", "fiber", "sugar", "vitamin", "mineral", "macro", "micro", "calorie", "nutrition", "dietary", "nutrient", "hydration", "fiber", "antioxidant", "substitute", "replacement", "alternative", "different", "another", "option", "backup", "second choice", "another", "solution", "variation",
      "Arnold Schwarzenegger", "Ronnie Coleman", "Jay Cutler", , "Ramon Dino", "Phil Heath", "Lee Haney", "Dorian Yates", "Frank Zane", "Flex Wheeler", "Rich Gaspari", "Sergio Oliva", "Larry Wheels", "Kai Greene", "Dexter Jackson", "Chris Bumstead", "Eddie Hall", "Hafthor Bjornsson", "Brian Shaw", "Dennis James", "Mamdouh Elssbiay (Big Ramy)", "Kris Gethin", "Lou Ferrigno", "Branch Warren", "Tom Platz", "Stan Efferding", "Dave Tate", "Mark Bell", "Louie Simmons", "Mike O'Hearn", "Paul Dillet", "Zyzz (Aziz Shavershian)", "Steve Reeves", "Reg Park", "Vince Gironda", "Bradley Martyn", "Robby Robinson", "Kevin Levrone", "Johnny Jackson", "Chris Cormier", "Albert Beckles", "Paul Anderson", "Bill Kazmaier", "Ed Coan", "Mark Henry", "Dan Green", "Mike Mentzer", "Franco Columbu", "Samir Bannout", "Serge Nubret", "Bob Paris", "Shawn Ray", "Tommy Kono", "Vladimir Putin (yes, the Russian President is known for his interest in judo and strength training)", "Charles Glass", "Hany Rambod", "Chris Aceto", "George Farah", "Neil Hill", "Chad Nichols", "Milos Sarcev", "Brooks Kubik", "Eric Helms", "Mike Israetel", "Bret Contreras", "Jim Wendler", "Stuart McRobert", "Christian Thibaudeau", "John Meadows", "Dave Palumbo", "Joe Weider", "Bob Hoffman", "Joe Gold", "Vince McMahon", "Johnnie Jackson", "Nick Mitchell", "Hannes Kolb", "Mark Rippetoe", "Jim Stoppani", "Elliott Hulse", "Ben Pakulski", "Tom Platz", "John Broz", "Dan John", "Louie Simmons", "Chris Duffin", "Boris Sheiko", "Mark Bell", "Silent Mike", "Mike Rashid", "Alan Aragon", "Layne Norton", "Clarence Kennedy", "Greg Nuckols", "Brandon Lilly", "Mike Tuchscherer", "Bryce Lewis", "Mike Matthews", "Brad Schoenfeld", "Jeff Nippard", "Dorian Yates", "John 'Mountain Dog' Meadows", "Paul Carter", "Matt Wenning", "Wendler", "Scott Stevenson", "Paul Revelia", "Seth Feroce", "Mila Lazar", "Steve Shaw", "Scott Herman",
      "Jeff Seid", "Jeff Cavaliere", "Eric Bugenhagen", "Ethan Suplee", "Eddie Hall", "Zyzz (Aziz Shavershian)", "Larry Wheels", "Life Fitness", "Nautilus", "Precor", "Cybex", "Matrix", "Hammer Strength", "Technogym", "Star Trac", "Keiser", "Body-Solid", "Octane Fitness", "Hoist Fitness", "True Fitness", "Spirit Fitness", "Bodycraft", "NordicTrack", "Bowflex", "ProForm", "Schwinn Fitness", "SOLE", "Horizon Fitness", "Cybex", "FreeMotion", "LifeSpan Fitness", "Marcy", "Powerline", "StairMaster", "Total Gym", "XMark Fitness", "York Barbell", "TuffStuff Fitness", "Sunny Health & Fitness", "Titan Fitness", "Rogue Fitness", "Rep Fitness", "Force USA", "Mirafit", "Bodymax", "Fitness Reality", "Body-Solid", "Gym Gear", "Technogym", "Life Fitness", "Precor", "Cybex", "Hammer Strength", "Matrix", "Technogym", "Star Trac", "Life Fitness", "Life Fitness", "Technogym", "Cybex", "Precor", "Keiser", "Star Trac", "Hammer Strength", "Nautilus", "Matrix", "Life Fitness", "Life Fitness", "Precor", "Life Fitness", "Technogym", "Cybex", "Precor", "Star Trac", "Matrix", "Cybex", "Life Fitness", "Technogym", "Precor", "Hammer Strength", "Star Trac", "Matrix", "Cybex", "Technogym", "Life Fitness", "Precor", "Star Trac", "Matrix", "Technogym", "Cybex", "Precor", "Hammer Strength", "Star Trac", "Matrix",
      "Gold's Gym", "24 Hour Fitness", "Equinox", "Anytime Fitness", "LA Fitness", "Planet Fitness", "GoodLife Fitness", "Snap Fitness", "World Gym", "Powerhouse Gym", "Barry's Bootcamp", "Crunch Fitness", "Blink Fitness", "Lifetime Fitness", "David Lloyd Clubs", "Virgin Active", "Fitness First", "The Gym Group", "PureGym", "Jetts Fitness", "Xercise4Less", "Orangetheory Fitness", "F45 Training", "CrossFit", "Curves", "Burn Boot Camp", "SoulCycle", "YogaWorks", "CorePower Yoga", "Bikram Yoga", "Hot Yoga", "Power Yoga", "YMCA", "Jazzercise", "Zumba Fitness", "Pilates Studio", "Club Pilates", "The Bar Method", "Physique 57", "Rumble Boxing", "TITLE Boxing Club", "UFC Gym", "Basecamp Fitness", "Fit Body Boot Camp", "Row House",
      "Bowflex", "CAP Barbell", "PowerBlock", "ProForm", "SPRI", "Yes4All", "AmazonBasics", "Marcy", "Neoprene Dumbbells", "Rubber Hex Dumbbells", "Ironmaster", "Rogue Fitness", "Titan Fitness", "Gymenist", "Body Solid", "JFIT", "Troy Barbell", "XMark Fitness", "Body-Solid Tools", "Rep Fitness", "Fitness Republic", "Sporzon!", "Fitness Alley", "BalanceFrom", "Perform Better", "0.5 kg", "1 kg", "1.5 kg", "2 kg", "2.5 kg", "3 kg", "3.5 kg", "4 kg", "4.5 kg", "5 kg", "5.5 kg", "6 kg", "6.5 kg", "7 kg", "7.5 kg", "8 kg", "8.5 kg", "9 kg", "9.5 kg", "10 kg", "11 kg", "12 kg", "13 kg", "14 kg", "15 kg", "16 kg", "17 kg", "18 kg", "19 kg", "20 kg", "21 kg", "22 kg", "23 kg", "24 kg", "25 kg", "26 kg", "27 kg", "28 kg", "29 kg", "30 kg", "31 kg", "32 kg", "33 kg", "34 kg", "35 kg", "36 kg", "37 kg", "38 kg", "39 kg", "40 kg", "41 kg", "42 kg", "43 kg", "44 kg", "45 kg", "46 kg", "47 kg", "48 kg", "49 kg", "50 kg", "55 kg", "60 kg", "65 kg", "70 kg", "75 kg", "80 kg", "85 kg", "90 kg", "95 kg", "100 kg", "1 lb", "2 lb", "3 lb", "4 lb", "5 lb", "6 lb", "7 lb", "8 lb", "9 lb", "10 lb", "11 lb", "12 lb", "13 lb", "14 lb", "15 lb", "16 lb", "17.5 lb", "18 lb", "19 lb", "20 lb", "21 lb", "22 lb", "23 lb", "24 lb", "25 lb", "26 lb", "27 lb", "28 lb", "29 lb", "30 lb", "31 lb", "32 lb", "33 lb", "34 lb", "35 lb", "36 lb", "37 lb", "38 lb", "39 lb", "40 lb", "41 lb", "42 lb", "43 lb", "44 lb", "45 lb", "46 lb", "47 lb", "48 lb", "49 lb", "50 lb", "55 lb", "60 lb", "65 lb", "70 lb", "75 lb", "80 lb", "85 lb", "90 lb", "95 lb", "100 lb"];

    // Convert the question to lowercase and split it into words
    const words = question.toLowerCase().split(/\s+/);

    // Check if any of the keywords appear as whole words in the question
    return dietKeywords.some((keyword) => {
      return words.includes(keyword.toLowerCase());
    });
  };

  if (!isDietQuestion(prompt)) {
    // If the question is not related to gym and nutrition fields, return a message
    return "Sorry, I'm not able to answer questions outside the gym and nutrition fields.";
  }

  // If the question is related to gym and nutrition fields, proceed with API call
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 5000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },

  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response);
  return response.text();
}

export default runChat;


// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai";

// const MODEL_NAME = "gemini-1.0-pro";
// const API_KEY = "AIzaSyBbkihA7GhG-tBcIdSsuhcub9B3W-EdliM";


// async function runChat(prompt) {
//   const genAI = new GoogleGenerativeAI(API_KEY);
//   const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//   const generationConfig = {
//     temperature: 0.9,
//     topK: 1,
//     topP: 1,
//     maxOutputTokens: 5000,
//   };

//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//   ];

//   const chat = model.startChat({
//     generationConfig,
//     safetySettings,
//     history: [
//     ],
//   });

//   const result = await chat.sendMessage(prompt);
//   const response = result.response;
//   console.log(response);
//   return response.text();
// }

// export default runChat;