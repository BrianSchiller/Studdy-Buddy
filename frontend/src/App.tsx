import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import WelcomePage from './pages/welcome/WelcomePage';
import ListPage from './pages/vocab_list/ListPage';
import QuizSelectorPage from './pages/quiz_selector/QuizSelectorPage';
import QuizPage from './pages/multiplechoice_quiz/QuizPage';
import FillSentenceQuizPage from './pages/fillsentence_quiz/FillSentenceQuizPage';
import QuizComplete from './pages/quizcomplete/QuizCompletePage';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/list" element={<ListPage />} />
                <Route path="/quiz-selector" element={<QuizSelectorPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/fill-sentence-quiz" element={<FillSentenceQuizPage />} />
                <Route path="/quiz-complete" element={<QuizComplete />} />
            </Routes>
        </Router>
    );
};

export default App;
