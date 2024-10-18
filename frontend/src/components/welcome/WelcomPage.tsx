// WelcomePage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './WelcomePage.css'; // Assume you have a separate CSS file for styling

const WelcomePage: React.FC = () => {
    const location = useLocation();
    const user = location.state?.username;

    return (
        <div className="welcome-container">
        <h1>Welcome to Studdy Buddy, {user}</h1>
        <p>Which Language would you like to learn?</p>
        {/* Add a list of languages or buttons to navigate further */}
        </div>
    );
};

export default WelcomePage;
