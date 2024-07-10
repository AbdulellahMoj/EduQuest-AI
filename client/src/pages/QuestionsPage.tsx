import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import courseData, { Question } from "../components/CourseData";
import MCQQuestion from "../components/MCQQuestion";
import confused from "../assets/mascot/confused.png";
import disappointed from "../assets/mascot/dissappointed.png";
import frown from "../assets/mascot/frown.png";
import proud from "../assets/mascot/proud.png";
import smile from "../assets/mascot/smile.png";
import ConfettiExplosion from "react-confetti-explosion";
import DoughnutChart from "../components/DoughnutChart";

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
  const [mascotMessage, setMascotMessage] = useState("Hey there");
  const [showMascotPopup, setShowMascotPopup] = useState(false); // State to manage popup visibility

  // State for Confetti Explosion
  const [isExploding, setIsExploding] = useState(false);

  // Function to handle next question
  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  // Function to handle answer click
  const handleAnswerClick = (selectedChoice: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctChoice = currentQuestion.answer; // Assuming correctChoice exists in Question type

    if (selectedChoice === correctChoice) {
      setCorrectAnswers((prevCount) => prevCount + 1);
      setIsExploding(true); // Trigger confetti explosion
      setTimeout(() => {
        setIsExploding(false); // Hide confetti after a short duration
      }, 3000);
    } else {
      setWrongAnswers((prevCount) => prevCount + 1);
    }

    nextQuestion();
    setShowMascotPopup(false); // Hide the popup after answer click
  };

  // Handle Next Click
  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
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

    // Change mascot message after 10 seconds
    const timer1 = setTimeout(() => {
      setMascotMessage(questions[currentQuestionIndex].hint);
      setShowMascotPopup(true); // Show the popup after 10 seconds
    }, 6000);

    // Clear timeouts on component unmount or when scores change
    return () => {
      clearTimeout(timer1);
    };
  }, [correctAnswers, wrongAnswers]);

  return (
    <div className="questions-page">
      <div className="questions-list">
        {currentQuestionIndex < questions.length && (
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
            />
          </div>
        )}

        {currentQuestionIndex >= questions.length && (
          <div className="question">
            <p>No more questions.</p>
            <DoughnutChart
              correctAnswers={correctAnswers}
              wrongAnswers={wrongAnswers}
            />
            <p>Correct answers: {correctAnswers}</p>
            <p>Wrong answers: {wrongAnswers}</p>
          </div>
        )}
      </div>
      {isExploding && <ConfettiExplosion />}
      <div className="question-right-graphics">
        <div className="power-ups">
          <div className="power-ups-container">
            <div className="power-ups-container-internal"></div>
          </div>
        </div>
        {showMascotPopup && ( // Conditionally render the popup based on state
          <div className="mascot-popup">
            <div className="mascot-popup-container">
              <div className="mascot-popup-internal">
                <div className="popup-text">{mascotMessage}</div>
              </div>
            </div>
          </div>
        )}
        <div className="mascot">
          <img width={150} src={mascotEmotion} alt="mascot" />
        </div>
      </div>
    </div>
  );
}

export default QuestionsPage;
