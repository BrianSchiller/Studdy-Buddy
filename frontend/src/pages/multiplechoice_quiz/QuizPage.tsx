import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "../../components/Text";
import { Menu } from "../../components/Menu";
import { Button } from "../../components/Button";
import { MultipleChoice } from "../../components/MultipleChoice";
import { NavigationHeader } from "../../components/NavigationHeader";
import { fetchVocabWords, updateUserProgress } from "../../api";
import { generateQuizQuestions, QuizQuestion } from "./quizUtils";
import {
    MultipleChoice_Quiz,
    DashboardPanel,
    NavigationFooter,
    StyledContainer,
    NextButtonWrapper,
} from "./stylesQuizPage";

// Utility to shuffle and limit questions to 10
const shuffleAndLimit = <T,>(array: T[], limit: number): T[] => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
};

const QuizPage: React.FC = () => {
    const navigate = useNavigate();

    // States
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true); // Initial loading state
    const [loadingResults, setLoadingResults] = useState(false); // Loading results state
    const [answerSelected, setAnswerSelected] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [buttonState, setButtonState] = useState<"check" | "next" | "finish">("check");
    const [score, setScore] = useState<number>(0); // Track the score
    const location = useLocation();
    const username = location.state?.username || "Guest"; // Added fallback username for clarity
    const topicId = location.state.topicId;

    // Fetch questions
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const vocabWords = await fetchVocabWords(topicId);

                // Select up to 10 questions and generate quiz questions
                const limitedWords = shuffleAndLimit(vocabWords, 10);
                const quizQuestions = await generateQuizQuestions(limitedWords, 4); // Adjusted for async function

                setQuestions(quizQuestions);
                setLoading(false);
            } catch (error) {
                console.error("Error loading quiz questions:", error);
                setLoading(false);
            }
        };
        loadQuestions();
    }, [topicId]);

    // Handle answer selection
    const handleAnswerSelect = (answer: string) => {
        setAnswerSelected(answer);
    };

    // Handle "Check" or "Next" button actions
    const handleButtonClick = async () => {
        if (buttonState === "check" && answerSelected !== null) {
            const isAnswerCorrect = questions[currentIndex].correctAnswer === answerSelected;
            setIsCorrect(isAnswerCorrect);

            if (isAnswerCorrect) {
                setScore((prevScore) => prevScore + 1);
            }

            setButtonState(currentIndex === questions.length - 1 ? "finish" : "next");
        } else if (buttonState === "next") {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setAnswerSelected(null);
            setIsCorrect(null);
            setButtonState("check");
        } else if (buttonState === "finish") {
            setLoadingResults(true); // Show loading indicator

            const totalQuestions = questions.length;
            const mistakes = totalQuestions - score;

            try {
                // Send progress update to backend
                await updateUserProgress(username, topicId, mistakes);

                // Navigate to quiz-complete page
                navigate("/quiz-complete", { state: { username, topicId, score, total: totalQuestions } });
            } catch (error) {
                console.error("Error submitting quiz results:", error);
            } finally {
                setLoadingResults(false); // Hide loading indicator
            }
        }
    };

    const handleCancelQuiz = () => {
        navigate("/welcome");
    };

    // Render loading screen when results are being prepared
    if (loadingResults) {
        return (
            <StyledContainer>
                <Text size="24px" weight="bold">
                    Preparing your results...
                </Text>
            </StyledContainer>
        );
    }

    // Render loading screen when quiz questions are loading
    if (loading) {
        return (
            <StyledContainer>
                <Text size="24px" weight="bold">
                    Loading Quiz...
                </Text>
            </StyledContainer>
        );
    }

    return (
        <StyledContainer>
            <Menu />
            <DashboardPanel>
                <NavigationHeader
                    title="Click on the right matching word"
                    imageSrc="https://placehold.co/95" // Replace with your image path or URL
                    currentIndex={currentIndex}
                    totalQuestions={questions.length}
                    progress={(currentIndex / questions.length) * 100}
                />
                <MultipleChoice_Quiz>
                    {questions.length > 0 && (
                        <MultipleChoice
                            question={questions[currentIndex].question}
                            image={questions[currentIndex].image || "https://placehold.co/95"} // Use provided image or fallback
                            options={questions[currentIndex].options}
                            onAnswerSelect={handleAnswerSelect}
                            selectedAnswer={answerSelected}
                            correctAnswer={isCorrect === null ? null : questions[currentIndex].correctAnswer}
                        />
                    )}
                    <NextButtonWrapper>
                        <Button
                            onClick={handleButtonClick}
                            disabled={buttonState === "check" && answerSelected === null}
                        >
                            {buttonState === "check"
                                ? "Check"
                                : buttonState === "next"
                                ? "Next"
                                : "Finish"}
                        </Button>
                    </NextButtonWrapper>
                </MultipleChoice_Quiz>
                <NavigationFooter>
                    <Button onClick={handleCancelQuiz}>Cancel Quiz</Button>
                </NavigationFooter>
            </DashboardPanel>
        </StyledContainer>
    );
};

export default QuizPage;
