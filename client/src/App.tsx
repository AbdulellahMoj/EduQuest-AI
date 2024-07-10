import "./App.scss";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import Modall from "./components/Modall";
import { useState } from "react";
import Levels from "./pages/Levels";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import QuestionPage from "./pages/QuestionsPage";
import QuestionsPage from "./pages/QuestionsPage";
import ScrollToHashElement from "@cascadia-code/scroll-to-hash-element";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <ScrollToHashElement behavior="smooth" inline="center" block="center" />
      <Modall isOpen={isModalOpen} onCloseModal={handleCloseModal} />
      <NavBar onOpenModal={handleOpenModal} />
      <Routes>
        <Route path="/" element={<Home onOpenModal={handleOpenModal} />} />
        <Route path="/course/:courseCode" element={<Levels />} />
        <Route
          path="/:courseCode/unit/:unitId/level/:levelId/questions"
          element={<QuestionsPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
