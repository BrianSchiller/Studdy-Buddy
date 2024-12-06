import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import WelcomePage from './pages/welcome/WelcomePage';
import ListPage from './pages/vocab_list/ListPage';
import QuizPage from './pages/multiplechoice_quiz/QuizPage';
import FillSentenceQuizPage from './pages/fillsentence_quiz/FillSentenceQuizPage';
import WordPairQuizPage from './pages/wordpair_quiz/WordPairQuizPage';
import QuizComplete from './pages/quizcomplete/QuizCompletePage';
import WordPairQuizComplete from './pages/quizcomplete/WordPairQuizComplete';
import ExamPage from './pages/exam/ExamPage';
import ExamComplete from './pages/exam/ExamCompletePage'; // Import Exam complete page
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Login and Welcome */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/welcome" element={<WelcomePage />} />

                {/* Vocabulary List */}
                <Route path="/list" element={<ListPage />} />

                {/* Quizzes */}
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/fill-sentence-quiz" element={<FillSentenceQuizPage />} />
                <Route path="/wordpair-quiz" element={<WordPairQuizPage />} />

                {/* Quiz Completion Pages */}
                <Route path="/quiz-complete" element={<QuizComplete />} />
                <Route path="/wordpair-quiz-complete" element={<WordPairQuizComplete />} />

                {/* Exams */}
                <Route path="/exam/:topicId" element={<ExamPage />} /> {/* Pass topicId as parameter */}
                <Route path="/exam-complete" element={<ExamComplete />} />
            </Routes>
        </Router>
    );
};

export default App;
