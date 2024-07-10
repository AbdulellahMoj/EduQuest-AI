import Banner from "../components/Banner";
import Theme1 from "../assets/images/Theme1.png";
import Theme2 from "../assets/images/Theme2.png";
import Theme3 from "../assets/images/Theme3.png";
import Theme4 from "../assets/images/Theme4.png";
import UploadBackDrop from "../assets/images/UploadBackDrop2.png";
import UploadBanner from "../components/UploadBanner";
import MCQQuestion from "../components/MCQQuestion";
import ChatBot from "react-chatbotify";

interface HomeProps {
  onOpenModal: () => void;
}

function Home({ onOpenModal }: HomeProps) {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-title">
          <div className="hero-graphics"></div>
          <div className="hero-title-text">Your Courses</div>
        </div>
        <div className="hero-banners">
          <Banner
            code="CPCS 211"
            course="LOGIC DESIGN"
            rate="87%"
            number={1}
            color="#33326C"
            background={Theme1}
          />
          <Banner
            code="CPCS 203"
            course="COMPUTER SCIENCE"
            rate="57%"
            number={2}
            color="#946a36"
            background={Theme2}
          />
          <Banner
            code="MATH 202"
            course="CALCULUS II"
            rate="26%"
            number={3}
            color="#51776A"
            background={Theme3}
          />
          <Banner
            code="MATH 202"
            course="CALCULUS II"
            rate="26%"
            number={4}
            color="#090A58"
            background={Theme4}
          />
          <UploadBanner
            color="#8772E4"
            number={0}
            background={UploadBackDrop}
            onOpenModal={onOpenModal}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
