// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import WelcomePage from './pages/welcome/WelcomPage';
import ListPage from './pages/verdurasyfrutas/ListPage'
import './App.css'; 
import QuizPage from './pages/verdurasyfrutas/QuizPage';
// Import other pages as needed

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/verdurasyfrutas" element={<ListPage />} />
        <Route path="/verdurasyfrutas/quiz" element={<QuizPage />} />
        {/* Add more routes here as you create more pages */}
      </Routes>
    </Router>
  );
};

export default App;
