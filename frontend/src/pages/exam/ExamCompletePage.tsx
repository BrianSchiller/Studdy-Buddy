import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import {
    StyledContainer,
    ResultsPanel,
    StyledTable,
    ButtonWrapper,
} from "./stylesExamComplete";

interface QuestionResult {
    question: string;
    correctAnswer: string;
    userAnswer: string;
}

const ExamCompletePage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Destructure state and provide defaults if missing
    const {
        username = "Guest",
        score = 0,
        totalQuestions = 0,
        questions = [],
        duration = 0, // New duration field in seconds
    } = location.state || {};

    // Log state for debugging
    useEffect(() => {
        console.log("ExamCompletePage location.state:", location.state);
        if (!location.state) {
            console.warn("No state passed. Redirecting to the welcome page.");
            navigate("/welcome"); // Redirect if no state is provided
        }
    }, [location.state, navigate]);

    const handleGoHome = () => {
        navigate("/welcome", { state: { username } });
    };

    // Format duration to MM:SS
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}m ${secs < 10 ? "0" : ""}${secs}s`;
    };

    if (!location.state) {
        return null; // Avoid rendering if no data is available
    }

    return (
        <StyledContainer>
            <ResultsPanel>
                <Text size="28px" weight="bold">Exam Complete!</Text>
                <Text size="24px">
                    Your Score: {score} / {totalQuestions} (
                    {((score / totalQuestions) * 100).toFixed(2)}%)
                </Text>
                <Text size="20px" color="#555">
                    Total Time Taken: {formatDuration(duration)}
                </Text>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Your Answer</th>
                            <th>Correct Answer</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((q: QuestionResult, index: number) => {
                            const isCorrect = q.userAnswer === q.correctAnswer;
                            return (
                                <tr key={index}>
                                    <td>{q.question}</td>
                                    <td
                                        style={{
                                            color: isCorrect ? "green" : "red",
                                            fontWeight: isCorrect ? "bold" : "normal",
                                        }}
                                    >
                                        {q.userAnswer}
                                    </td>
                                    <td
                                        style={{
                                            color: "blue",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {q.correctAnswer}
                                    </td>
                                    <td>{isCorrect ? "Correct" : "Incorrect"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </StyledTable>
                <ButtonWrapper>
                    <Button onClick={handleGoHome}>Home</Button>
                </ButtonWrapper>
            </ResultsPanel>
        </StyledContainer>
    );
};

export default ExamCompletePage;
