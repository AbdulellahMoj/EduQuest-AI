import React, { useState } from "react";
import MCQAnswer from "./MCQAnswer";
import MCQBanner from "./MCQBanner";

interface Props {
  questionNo: number;
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  onNext: () => void;
  onAnswerClick: (selectedChoice: number) => void;
  correctChoice: number;
  questionBannerRef?: React.RefObject<SVGSVGElement>;
  mcqQuestionRef?: React.RefObject<HTMLDivElement>;
}

function MCQQuestionC({
  question,
  questionNo,
  choice1,
  choice2,
  choice3,
  choice4,
  onAnswerClick,
  correctChoice,
  questionBannerRef,
  mcqQuestionRef,
}: Props) {
  const [selectedChoice, setSelectedChoice] = useState(-1);

  const handleAnswerClick = (choice: number) => {
    onAnswerClick(choice); // Call onAnswerClick with selected choice
    setSelectedChoice(choice);
  };

  const getFill = (choice: number) => {
    if (selectedChoice === -1) return -1;
    return selectedChoice === choice
      ? selectedChoice === correctChoice
        ? 0
        : 1
      : -1;
  };

  return (
    <div className="mcq-page">
      <MCQBanner
        question={question}
        questionNo={questionNo}
        questionBannerRef={questionBannerRef}
        mcqQuestionRef={mcqQuestionRef}
      />
      <div className="answer-container-c">
        <div className="answer-column-left">
          <div className="answer-1">
            <MCQAnswer
              letter="A"
              text={choice1}
              onClick={() => handleAnswerClick(0)}
              fill={getFill(0)}
              right="160px"
            />
          </div>
          <div className="answer-2">
            <MCQAnswer
              letter="B"
              text={choice2}
              onClick={() => handleAnswerClick(1)}
              fill={getFill(1)}
              right="160px"
            />
          </div>
        </div>

        <div className="answer-column-right">
          <div className="answer-3">
            <MCQAnswer
              letter="C"
              text={choice3}
              onClick={() => handleAnswerClick(2)}
              fill={getFill(2)}
              right="160px"
            />
          </div>
          <div className="answer-4">
            <MCQAnswer
              letter="D"
              text={choice4}
              onClick={() => handleAnswerClick(3)}
              fill={getFill(3)}
              right="160px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MCQQuestionC;
