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
    const location = useLocation();
    const username = location.state?.username || "Guest";
    const topicId = location.state?.topicId;

    // States
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingResults, setLoadingResults] = useState(false);
    const [answerSelected, setAnswerSelected] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [buttonState, setButtonState] = useState<"check" | "next" | "finish">("check");
    const [score, setScore] = useState<number>(0);
    const [timer, setTimer] = useState<number>(0);

    // Timer effect
    useEffect(() => {
        const timerId = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const vocabWords = await fetchVocabWords(topicId);
                const limitedWords = shuffleAndLimit(vocabWords, 10);
                const quizQuestions = await generateQuizQuestions(limitedWords, 4);
                setQuestions(quizQuestions);
                setLoading(false);
            } catch (error) {
                console.error("Error loading quiz questions:", error);
                setLoading(false);
            }
        };
        loadQuestions();
    }, [topicId]);

    const handleButtonClick = async () => {
        if (buttonState === "check" && answerSelected !== null) {
            const isAnswerCorrect = questions[currentIndex].correctAnswer === answerSelected;
            setIsCorrect(isAnswerCorrect);
            if (isAnswerCorrect) setScore((prevScore) => prevScore + 1);
            setButtonState(currentIndex === questions.length - 1 ? "finish" : "next");
        } else if (buttonState === "next") {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setAnswerSelected(null);
            setIsCorrect(null);
            setButtonState("check");
        } else if (buttonState === "finish") {
            setLoadingResults(true);
            const mistakes = questions.length - score;
            try {
                await updateUserProgress(username, topicId, mistakes, timer);
                navigate("/quiz-complete", { state: { username, topicId, score, total: questions.length } });
            } catch (error) {
                console.error("Error submitting quiz results:", error);
            } finally {
                setLoadingResults(false);
            }
        }
    };

    return (
        <StyledContainer>
            <Menu />
            <DashboardPanel>
                <NavigationHeader
                    title="Click on the right matching word"
                    imageSrc="https://placehold.co/95"
                    currentIndex={currentIndex}
                    totalQuestions={questions.length}
                    progress={(currentIndex / questions.length) * 100}
                    timer={timer}
                />
                <MultipleChoice_Quiz>
                    {loading ? (
                        <Text size="20px" weight="bold">Loading Quiz...</Text>
                    ) : (
                        <>
                            {questions.length > 0 && (
                                <MultipleChoice
                                    question={questions[currentIndex].question}
                                    image={questions[currentIndex].image || "https://placehold.co/95"}
                                    options={questions[currentIndex].options}
                                    onAnswerSelect={setAnswerSelected}
                                    selectedAnswer={answerSelected}
                                    correctAnswer={isCorrect === null ? null : questions[currentIndex].correctAnswer}
                                    hasChecked={buttonState !== "check"}
                                />
                            )}
                            <NextButtonWrapper>
                                <Button onClick={handleButtonClick} disabled={buttonState === "check" && !answerSelected}>
                                    {buttonState === "check" ? "Check" : buttonState === "next" ? "Next" : "Finish"}
                                </Button>
                            </NextButtonWrapper>
                        </>
                    )}
                </MultipleChoice_Quiz>
            </DashboardPanel>
        </StyledContainer>
    );
};

export default QuizPage;
