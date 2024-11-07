// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import WelcomePage from './components/welcome/WelcomPage';
import ListPage_VyF from './components/verdurasYfrutas/ListPage_VyF';
// Import other pages as needed

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/verdurasyfrutas" element={<ListPage_VyF />} />
        {/* Add more routes here as you create more pages */}
      </Routes>
    </Router>
  );
};

export default App;
