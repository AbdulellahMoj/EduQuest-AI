import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import courseData, { Question } from "../components/CourseData";
import MCQQuestion from "../components/MCQQuestion";
import confused from "../assets/mascot/confused.png";
import disappointed from "../assets/mascot/dissappointed.png"; // Corrected typo in import path
import frown from "../assets/mascot/frown.png";
import proud from "../assets/mascot/proud.png";
import smile from "../assets/mascot/smile.png";
import ConfettiExplosion from "react-confetti-explosion";
import Lines from "../components/Lines";
import MascotEnd from "../components/MascotEnd";
import BannerEnd from "../components/BannerEnd";
import MiniBannerEnd from "../components/MiniBannerEnd";
import ButtonEnd from "../components/ButtonEnd";
import LevelButton from "../components/LevelButton";

function QuestionsPage() {
  const { courseCode, unitId, levelId } = useParams<{
    courseCode: string;
    unitId: string;
    levelId: string;
  }>();

  // Convert unitId and levelId to numbers
  const unitIdNumber = parseInt(unitId!, 10);
  const levelIdNumber = parseInt(levelId!, 10);

  // Fetch course data
  const course = courseData[courseCode!];
  const unit = course.units.find((unit) => unit.unitId === unitIdNumber);
  const level = unit!.levels.find((level) => level.levelId === levelIdNumber);
  const questions: Question[] = level!.questions;

  // State to manage current question index and scores
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [mascotEmotion, setMascotEmotion] = useState(smile);
  const [mascotMessage, setMascotMessage] = useState("");
  const [showMascotPopup, setShowMascotPopup] = useState(false); // State to manage popup visibility
  const [hintCount, setHintCount] = useState(0); // State to count hints
  const [correctChoice, setCorrectChoice] = useState(0);
  const [showLevelButton, setShowLevelButton] = useState(false); // State to manage LevelButton visibility

  // State for Confetti Explosion
  const [isExploding, setIsExploding] = useState(false);

  // Reference for the mascot popup
  const popupRef = useRef<HTMLDivElement>(null);

  // Function to handle next question
  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setShowLevelButton(false); // Hide LevelButton on next question
    setShowMascotPopup(false); // Hide Mascot popup on next question
  };

  // Function to handle answer click
  const handleAnswerClick = (selectedChoice: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctChoice = currentQuestion.answer; // Assuming correctChoice exists in Question type
    setCorrectChoice(currentQuestion.answer);

    if (selectedChoice === correctChoice) {
      setCorrectAnswers((prevCount) => prevCount + 1);
      setIsExploding(true); // Trigger confetti explosion
      setTimeout(() => {
        setIsExploding(false); // Hide confetti after a short duration
        nextQuestion();
      }, 2000);
    } else {
      setWrongAnswers((prevCount) => prevCount + 1);
      setMascotMessage(questions[currentQuestionIndex].explanation); // Update mascot message to the explanation text
      setShowMascotPopup(true);
      setShowLevelButton(true); // Show LevelButton on wrong answer
      setTimeout(() => {
        nextQuestion(); // Move to the next question after 3 seconds
        setShowMascotPopup(false); // Hide the popup after answer click
      }, 8000);
    }
  };

  // Mascot Emotions and Rendering
  const determineMascotEmotion = () => {
    if (wrongAnswers >= 3) {
      setMascotEmotion(confused);
    } else if (wrongAnswers === 2) {
      setMascotEmotion(disappointed);
    } else if (wrongAnswers === 1) {
      setMascotEmotion(frown);
    } else if (correctAnswers >= 2) {
      setMascotEmotion(proud);
    } else {
      setMascotEmotion(smile);
    }
  };

  // Update mascot emotion and message when scores change
  useEffect(() => {
    determineMascotEmotion();

    // Change mascot message after 6 seconds (assuming 6000 milliseconds)
    const timer = setTimeout(() => {
      setMascotMessage(questions[currentQuestionIndex].hint); // Update mascot message to the hint text
      setShowMascotPopup(true); // Show the popup with the hint
      setHintCount((prevCount) => prevCount + 1); // Increment hint count
    }, 15000);

    // Clear timeouts on component unmount or when scores change
    return () => {
      clearTimeout(timer);
    };
  }, [correctAnswers, wrongAnswers]);

  // Calculations
  const progressRate = Math.floor(
    (correctAnswers / (correctAnswers + wrongAnswers)) * 100
  );

  /// Adjust the position of the popup based on the message length
  useEffect(() => {
    if (popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight;
      const mascotMessageLength = mascotMessage.length;

      // Example condition to adjust based on message length
      if (mascotMessageLength > 50) {
        popupRef.current.style.top = "-40px"; // Move higher if message is long
      } else {
        popupRef.current.style.top = "20px"; // Default position
      }
    }
  }, [mascotMessage]);

  return (
    <div className="questions-page">
      <Lines />
      <div className="questions-list">
        {currentQuestionIndex < questions.length ? (
          <div
            key={questions[currentQuestionIndex].questionId}
            className="question"
          >
            <MCQQuestion
              question={questions[currentQuestionIndex].questionText}
              questionNo={questions[currentQuestionIndex].questionId}
              choice1={questions[currentQuestionIndex].choices[0]}
              choice2={questions[currentQuestionIndex].choices[1]}
              choice3={questions[currentQuestionIndex].choices[2]}
              choice4={questions[currentQuestionIndex].choices[3]}
              onNext={nextQuestion} // Pass nextQuestion function to MCQQuestion component
              onAnswerClick={handleAnswerClick} // Pass handleAnswerClick function to MCQQuestion component
              correctChoice={correctChoice}
            />
          </div>
        ) : (
          <div className="question">
            <MascotEnd progressRate={progressRate} />
            <BannerEnd
              correctAnswers={correctAnswers}
              wrongAnswers={wrongAnswers}
              xp={1280}
            />
            <MiniBannerEnd
              correct={correctAnswers}
              wrong={wrongAnswers}
              hints={hintCount}
            />
            <ButtonEnd />
          </div>
        )}
      </div>
      {isExploding && <ConfettiExplosion />}
      {currentQuestionIndex < questions.length && (
        <div className="question-right-graphics">
          <div className="power-ups">
            <div className="power-ups-container">
              <div className="power-ups-container-internal"></div>
            </div>
          </div>
          {showMascotPopup && ( // Conditionally render the popup based on state
            <div className="mascot-popup" ref={popupRef}>
              <div className="mascot-popup-container">
                <div className="mascot-popup-internal">
                  <div className="popup-text">{mascotMessage}</div>
                </div>
              </div>
            </div>
          )}
          <div className="mascot" onClick={() => setShowMascotPopup(true)}>
            <img width={150} src={mascotEmotion} alt="mascot" />
          </div>
          {showLevelButton && ( // Conditionally render LevelButton only if showLevelButton is true
            <LevelButton
              onClick={() => {
                nextQuestion();
                setShowMascotPopup(false); // Hide Mascot popup on LevelButton click
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionsPage;
