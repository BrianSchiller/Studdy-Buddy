import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import {
    StyledContainer,
    ResultsPanel,
    StyledTable,
    ButtonWrapper,
} from "./stylesExamComplete";

const ExamCompletePage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { username, score, totalQuestions } = location.state || {
        username: "Guest",
        score: 0,
        totalQuestions: 0,
    };

    const handleGoHome = () => {
        navigate("/welcome", { state: { username } });
    };

    return (
        <StyledContainer>
            <ResultsPanel>
                <Text size="28px" weight="bold">
                    Exam Complete!
                </Text>
                <Text size="24px">
                    Your Score: {score} / {totalQuestions} (
                    {((score / totalQuestions) * 100).toFixed(2)}%)
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
                            <td>{totalQuestions}</td>
                        </tr>
                        <tr>
                            <td>Accuracy</td>
                            <td>{((score / totalQuestions) * 100).toFixed(2)}%</td>
                        </tr>
                    </tbody>
                </StyledTable>
                <ButtonWrapper>
                    <Button onClick={handleGoHome}>Go Back to Home</Button>
                </ButtonWrapper>
            </ResultsPanel>
        </StyledContainer>
    );
};

export default ExamCompletePage;
