import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import WelcomePage from './pages/welcome/WelcomePage';
import ListPage from './pages/vocab_list/ListPage';
import QuizPage from './pages/multiplechoice_quiz/QuizPage';
import QuizComplete from './pages/quizcomplete/QuizCompletePage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz-complete" element={<QuizComplete />} />
      </Routes>
    </Router>
  );
};

export default App;
