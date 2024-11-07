import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import './LoginPage.css'; // Importing the CSS file

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleLogin = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/login/${username}/`);
        const data = await response.json();
        
        if (data.exists) {
            navigate('/welcome', { state: { username } });
        } else {
            alert('User does not exist. Please try again.');
        }
        } catch (error) {
        console.error('Error checking user:', error);
        alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-container">
        <h1>Welcome to Studdy Buddy!</h1>
        <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
