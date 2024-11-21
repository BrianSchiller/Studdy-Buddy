import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "../../components/Text";
import { Menu } from "../../components/Menu";
import { Button } from "../../components/Button";
import { MultipleChoice } from "../../components/MultipleChoice";
import { NavigationHeader } from "../../components/NavigationHeader";
import { fetchVocabWords } from "../../api";
import { generateQuizQuestions, QuizQuestion } from "./quizUtils";
import {
    MultipleChoice_Quiz,
    DashboardPanel,
    NavigationFooter,
    StyledContainer,
    NextButtonWrapper,
} from "./stylesQuizPage";

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

    // Fetch questions
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const vocabWords = await fetchVocabWords();
                const quizQuestions = generateQuizQuestions(vocabWords, 4);
                setQuestions(quizQuestions);
                setLoading(false);
            } catch (error) {
                console.error("Error loading quiz questions:", error);
                setLoading(false);
            }
        };
        loadQuestions();
    }, []);

    // Handle answer selection
    const handleAnswerSelect = (answer: string) => {
        setAnswerSelected(answer);
    };

    // Handle "Check" or "Next" button actions
    const handleButtonClick = () => {
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
            // Show loading indicator before navigating
            setLoadingResults(true);

            // Simulate loading and then navigate
            setTimeout(() => {
                navigate("/quiz-complete", { state: { score, total: questions.length } });
            }, 2000); // Adjust the timeout duration as needed
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
                    progress={((currentIndex) / questions.length) * 100}
                />
                <MultipleChoice_Quiz>
                    {questions.length > 0 && (
                        <MultipleChoice
                            question={questions[currentIndex].question}
                            image="https://placehold.co/95" // Pass the image to the component
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
