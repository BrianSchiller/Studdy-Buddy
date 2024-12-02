import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import { StyledContainer, ResultsPanel, StyledTable } from "./stylesQuizComplete";

const QuizComplete: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { score, total } = location.state || { score: 0, total: 0 };

    const handleRestartQuiz = () => {
        navigate("/verdurasyfrutas/quiz");
    };

    const handleGoHome = () => {
        navigate("/welcome");
    };

    return (
        <StyledContainer>
            <ResultsPanel>
                <Text size="28px" weight="bold">
                    Quiz Complete!
                </Text>
                <Text size="24px">
                    Your Score: {score} / {total} ({((score / total) * 100).toFixed(2)}%)
                </Text>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Statistic</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Correct Answers</td>
                            <td>{score}</td>
                        </tr>
                        <tr>
                            <td>Total Questions</td>
                            <td>{total}</td>
                        </tr>
                        <tr>
                            <td>Accuracy</td>
                            <td>{((score / total) * 100).toFixed(2)}%</td>
                        </tr>
                    </tbody>
                </StyledTable>
                <Button onClick={handleRestartQuiz}>Restart Quiz</Button>
                <Button onClick={handleGoHome}>Go Home</Button>
            </ResultsPanel>
        </StyledContainer>
    );
};

export default QuizComplete;
