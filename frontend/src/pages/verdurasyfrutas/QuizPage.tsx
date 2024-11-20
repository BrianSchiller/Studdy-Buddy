import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "../../components/Text";
import { Menu } from "../../components/Menu";
import { Button } from "../../components/Button";
import { MultipleChoice } from "../../components/MultipleChoice";
import { fetchVocabWords } from "../../api";
import { generateQuizQuestions, QuizQuestion } from "./quizUtils";
import {
    MultipleChoice_Quiz,
    DashboardPanel,
    NavigationHeader,
    NavigationFooter,
    StyledContainer,
    ProgressBar,
    NextButtonWrapper,
} from "./stylesQuizPage";

const QuizPage: React.FC = () => {
    const navigate = useNavigate();

    // States
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
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
            navigate("/quiz-complete", { state: { score, total: questions.length } });
        }
    };

    const handleCancelQuiz = () => {
        navigate("/welcome");
    };

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
                <MultipleChoice_Quiz>
                    <NavigationHeader>
                        <Text size="24px" weight="bold">
                            Question {currentIndex + 1} of {questions.length}
                        </Text>
                        <ProgressBar progress={(currentIndex / questions.length) * 100} />
                    </NavigationHeader>
                    {questions.length > 0 && (
                        <MultipleChoice
                            question={questions[currentIndex].question}
                            options={questions[currentIndex].options}
                            onAnswerSelect={handleAnswerSelect}
                            selectedAnswer={answerSelected}
                            correctAnswer={isCorrect === null ? null : questions[currentIndex].correctAnswer}
                        />
                    )}
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
                </MultipleChoice_Quiz>
                <NavigationFooter>
                    <Button onClick={handleCancelQuiz}>Cancel Quiz</Button>
                </NavigationFooter>
            </DashboardPanel>
        </StyledContainer>
    );
};

export default QuizPage;
