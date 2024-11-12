import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Importing the CSS file

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/login/${username}/`
      );
      const data = await response.json();

      if (data.exists) {
        navigate("/welcome", { state: { username } });
      } else {
        alert("User does not exist. Please try again.");
      }
    } catch (error) {
      console.error("Error checking user:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="background">
      {/* Decorative elements */}
      <div className="ellipse-5"></div>
      <div className="ellipse-6"></div>

      {/* Main content container LEFT */}
      <div className="rectangle-14">
        <div className="welcome-content">
          <h1>Welcome</h1>
          <div>
            <img
              className="welcome-image"
              src="images/welcomeimage.png"
              alt=""
            />
          </div>
        </div>
        {/* Middle line*/}
        <div className="middle-content">
          <h1></h1>
          <div>
            <img className="middle-Line" src="images/Line.png" alt="" />
          </div>
          <h1></h1>
        </div>
        {/* Main content container RIGHT */}
        <div className="login-content">
          <h1>Log in</h1>
          <div className="login-container">
            <div></div>
            <h2>User name</h2>
            <div>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <h2>Password</h2>
            <div>
              <input type="password" placeholder="*******" />
            </div>
            <div>
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative dots */}
      <div className="dot-frame">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default LoginPage;
