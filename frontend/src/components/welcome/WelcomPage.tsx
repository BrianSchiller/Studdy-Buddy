// WelcomePage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Updated import
import './WelcomePage.css'; // Assume you have a separate CSS file for styling

const WelcomePage: React.FC = () => {
    const location = useLocation();
    const user = location.state?.username;
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleTask_VyF = async () => {
         navigate('/verdurasyfrutas');
    };

    return (
        <div className="welcome-container">
        <h1>Welcome to Studdy Buddy, {user}</h1>
        <p>Which Language would you like to learn?</p>
        {/* Add a list of languages or buttons to navigate further */}
        <button onClick={handleTask_VyF}>Verduras y Frutas</button>
        </div>
    );
};

export default WelcomePage;
