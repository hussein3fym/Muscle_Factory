import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "./../../../Context/AuthProvider";
import "./Home.css";
import { Link } from "react-router-dom";
import experienceImage from "./../../../Assets/about.jpg";
import trainers from "./../../../Assets/icons/coach.png";
import certificate from "./../../../Assets/icons/guarantee-certificate.png";
import nutrition from "./../../../Assets/images/nutrition.jpg";
import trans1 from "./../../../Assets/images/pexels-cottonbro-studio-4761785.jpg";
import trans2 from "./../../../Assets/images/gym.png";
import trans3 from "./../../../Assets/images/anastase-maragos-9dzWZQWZMdE-unsplash.jpg";

const Home = () => {
  const { isLoggedIn } = useAuth();
  const [word, setWord] = useState("Mentality");
  const elementsRef = useRef([]);

  useEffect(() => {
    const words = ["Mentality", "Lifestyle", "Journey"];
    let currentIndex = 0;
    const interval = setInterval(() => {
      const nextWord = words[currentIndex];
      setWord(nextWord);
      currentIndex = (currentIndex + 1) % words.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    elementsRef.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      elementsRef.current.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);
  const email = "musclesfactory101@gmail.com"; // Declare email constant outside the function

  const handleSendEmail = () => {
    const subject = "Regarding Your Muscle Factory Account";
    const body = "Dear Admin,\n\n";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div>
      <div className="home-container">
        <div className="home-overlay"></div>
        <div className="home-content">
          <div
            className="home-text-container hidden"
            ref={(el) => (elementsRef.current[0] = el)}
          >
            <h1>Fitness & Health is a </h1>{" "}
            <h1>
              <span className="typing-animation">{word}</span>
            </h1>
            <p>
              It's a fitness hub offering everything for gym enthusiasts and
              soon expanding to cater to all sports needs.
            </p>
            {!isLoggedIn ? (
              <Link to="/Register" className="link">
                {" "}
                Join Now!{" "}
              </Link>
            ) : (
              <Link to="/Workout" className="linkAfterLogin">
                Let's Start Now!
              </Link>
            )}
            <div
              className="count-home hidden"
              ref={(el) => (elementsRef.current[1] = el)}
            >
              <div>
                <h2> +1500 </h2>
                <h4 className="count">Exercise</h4>
              </div>
              <h3>|</h3>
              <div>
                <h2> +50 </h2>
                <h4 className="count">Trainer</h4>
              </div>
              <h3>|</h3>
              <div>
                <h2> +500 </h2>
                <h4 className="count">Achieved Goal</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="help ">
        <h1 className="h1-help">Muscle Factory Where Results are Built.</h1>
        <div
          className="help-container hidden"
          ref={(el) => (elementsRef.current[2] = el)}
        >
          <div className="help-card">
            <h2>Workout</h2>
            <p>
              Find the best workout for you, whether you're looking for a
              strength training, cardio, or yoga workout.
            </p>
            <Link to="/Workout" className="card-link">
              Find Workout
            </Link>
          </div>
          <div
            className="help-card hidden"
            ref={(el) => (elementsRef.current[3] = el)}
          >
            <h2>Trainer</h2>
            <p>
              Find the best trainer for you, whether you're looking for a
              strength training, cardio, or yoga workout.
            </p>
            <Link to="/Coaches" className="card-link">
              Find Trainer
            </Link>
          </div>
          <div
            className="help-card   hidden"
            ref={(el) => (elementsRef.current[4] = el)}
          >
            <h2> Weight Goal</h2>
            <p>
              Find the best goal for you, whether you're looking for a strength
              training, cardio, or yoga workout.
            </p>
            <Link to="/Nutrition" className="card-link">
              Find Plan
            </Link>
          </div>
        </div>

        <div
          className="Experience hidden"
          ref={(el) => (elementsRef.current[5] = el)}
        >
          <div className="experience-container">
            <img src={experienceImage} alt="" />
            <div className="text-container">
              <h1> +10 years of Experience in fitness</h1>
              <p>
                With over 10 years of experience in the fitness industry, we
                have helped numerous individuals achieve their fitness goals.
                Our expertise ranges from personalized training programs to
                nutrition guidance, ensuring that our clients receive
                comprehensive support on their fitness journey.
              </p>{" "}
              <div className="trainer-certificate">
                <div>
                  <img src={trainers} alt="" />
                  <h2> Certified Squad</h2>
                  <p>
                    Our certified squad is dedicated to helping you achieve your
                    goals. With expert guidance and support, we're committed to
                    empowering you on your journey towards success.
                  </p>
                </div>
                <div>
                  <img src={certificate} alt="" />
                  <h2>Award Winning</h2>
                  <p>
                    Our award-winning services are recognized for excellence and
                    innovation. We tailor our solutions to exceed your
                    expectations, setting the standard in our industry with a
                    commitment to quality and customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="nutrition hidden"
          ref={(el) => (elementsRef.current[6] = el)}
        >
          <div className="nutrition-container">
            <div className="text-container">
              <h1>Nutrition Plan Using AI</h1>
              <p>
                Unlock the power of AI to tailor your nutrition plan, seamlessly
                integrating cutting-edge technology with your wellness goals,
                optimizing your health journey with personalized guidance,
                fueling your body for peak performance and vitality.
              </p>
              <p>1- Calories Calculator</p>
              <p>2- BMI Calculator</p>
              <p>3- Healthy Food Recipes</p>
            </div>
            <div className="image-container">
              <img src={nutrition} alt="" />
            </div>
          </div>
        </div>
        <div className="Transformation ">
          <h1>Our Transformation</h1>
          <h3>Don't deprive yourself of knowing how strong you are</h3>
          <div className="transformation-container">
            <div
              className="transformation-card hidden"
              ref={(el) => (elementsRef.current[7] = el)}
            >
              <img src={trans1} alt="" />
              <p>
                "Muscle Factory not only helps me hit my macros, but also makes
                sure I'm not eating the same bland thing every day. I've lost 35
                lbs over the past year, and with ETM, I'm eating and performing
                better than ever." * Sam Konowich @samkonthemankon (Sam is now
                our first ETM sponsored athlete!)
              </p>
            </div>
            <div
              className="transformation-card hidden"
              ref={(el) => (elementsRef.current[8] = el)}
            >
              <p>
                "I found out about Muscle Factory in July 2017 and lost 32 lbs
                in 6 months! Now I'm a fit over 50 female in amazing condition,
                and this site is what I refer to several times a day to ensure I
                eat properly and manage my macros." * Meg M., awesome ETM user
              </p>
              <img src={trans2} alt="" />
            </div>
            <div
              className="transformation-card hidden"
              ref={(el) => (elementsRef.current[9] = el)}
            >
              <img src={trans3} alt="" />
              <p>
                "I started tracking my weight in April of 2013 when I was
                184lbs. In May I signed up for Muscle Factory and immediately
                appreciated being able to just cook the menu and not worry about
                what to have for dinner. By November I was down to 155lbs and I
                still use Muscle Factory today!" * Ben Kutil, Product designer
              </p>
            </div>
          </div>
          <div>
            <button
              className="joinUs hidden"
              ref={(el) => (elementsRef.current[10] = el)}
              onClick={handleSendEmail}
            >
              Send feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
