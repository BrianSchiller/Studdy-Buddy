import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import { StyledContainer, ResultsPanel, StyledTable } from "./stylesQuizComplete";

const WordPairQuizComplete: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { mistakes, timer } = location.state || { mistakes: 0, timer: 0 };
    const username = location.state?.username || "Guest"; // Fallback username

    const handleGoHome = () => {
        navigate("/welcome", { state: { username } });
    };

    return (
        <StyledContainer>
            <ResultsPanel>
                <Text size="28px" weight="bold">Quiz Complete!</Text>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Statistic</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Mistakes</td>
                            <td>{mistakes}</td>
                        </tr>
                        <tr>
                            <td>Total Time</td>
                            <td>{timer} seconds</td>
                        </tr>
                    </tbody>
                </StyledTable>
                <Button onClick={handleGoHome}>Go Home</Button>
            </ResultsPanel>
        </StyledContainer>
    );
};

export default WordPairQuizComplete;
