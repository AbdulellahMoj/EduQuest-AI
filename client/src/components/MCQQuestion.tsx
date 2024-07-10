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
}
function MCQQuestion({
  question,
  questionNo,
  choice1,
  choice2,
  choice3,
  choice4,
  onAnswerClick,
}: Props) {
  const handleAnswerClick = (choice: number) => {
    onAnswerClick(choice); // Call onAnswerClick with selected choice
  };
  return (
    <div className="mcq-page">
      <MCQBanner question={question} questionNo={questionNo} />
      <MCQAnswer
        letter="A"
        text={choice1}
        onClick={() => handleAnswerClick(0)}
      />
      <MCQAnswer
        letter="B"
        text={choice2}
        onClick={() => handleAnswerClick(1)}
      />
      <MCQAnswer
        letter="C"
        text={choice3}
        onClick={() => handleAnswerClick(2)}
      />
      <MCQAnswer
        letter="D"
        text={choice4}
        onClick={() => handleAnswerClick(3)}
      />
    </div>
  );
}

export default MCQQuestion;
