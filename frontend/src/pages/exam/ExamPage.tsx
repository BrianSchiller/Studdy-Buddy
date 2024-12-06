import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    StyledExamContainer,
    ExamHeader,
    ExamTitle,
    ExamTimer,
    QuestionContainer,
    QuestionText,
    OptionsContainer,
    OptionButton,
    SubmitButtonWrapper,
    SubmitButton,
} from "./styleExamPage";
import { fetchExam, fetchRandomWords, submitExam } from "../../api";

interface Question {
    question: string;
    answer: string;
    options: string[];
}

interface ExamData {
    id: number;
    exam_text: string;
    questions: Question[];
}

const ExamPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const topicId = location.state?.topicId || 1;
    const username = location.state?.username || "Guest";

    const [examData, setExamData] = useState<ExamData | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [remainingTime, setRemainingTime] = useState<number>(1800);
    const [score, setScore] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    // State to track user answers
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const data = await fetchExam(topicId);
                for (const question of data.questions) {
                    const randomOptions = await fetchRandomWords(3);
                    question.options = [
                        ...randomOptions.map((word) => word.spanish),
                        question.answer,
                    ].sort(() => Math.random() - 0.5); // Shuffle options
                }
                setExamData(data);
            } catch (error) {
                console.error("Error fetching exam data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExamData();
    }, [topicId]);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleAnswerSelect = (option: string) => {
        setSelectedOption(option);

        // Update answers state
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentQuestionIndex]: option,
        }));

        // Update score if answer is correct
        if (option === examData?.questions[currentQuestionIndex]?.answer) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const handleNextOrFinish = async () => {
        if (currentQuestionIndex < (examData?.questions.length || 0) - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedOption(null);
        } else {
            await handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            await submitExam(examData?.id || 0, username, score, answers);
            navigate("/exam-complete", {
                state: {
                    username,
                    score,
                    totalQuestions: examData?.questions.length || 0,
                    questions: examData?.questions.map((q, index) => ({
                        question: q.question,
                        correctAnswer: q.answer,
                        userAnswer: answers[index] || "No Answer",
                    })),
                },
            });
        } catch (error) {
            console.error("Error submitting exam:", error);
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    if (loading) {
        return (
            <StyledExamContainer>
                <ExamTitle>Loading Exam...</ExamTitle>
            </StyledExamContainer>
        );
    }

    if (!examData || !examData.questions) {
        return (
            <StyledExamContainer>
                <ExamTitle>Error: Unable to load exam</ExamTitle>
            </StyledExamContainer>
        );
    }

    const currentQuestion = examData.questions[currentQuestionIndex];

    return (
        <StyledExamContainer>
            <ExamHeader>
                <ExamTitle>{examData.exam_text}</ExamTitle>
                <ExamTimer>Time Remaining: {formatTime(remainingTime)}</ExamTimer>
            </ExamHeader>
            <QuestionContainer>
                <QuestionText>{currentQuestion.question}</QuestionText>
                <OptionsContainer>
                    {currentQuestion.options?.map((option, index) => (
                        <OptionButton
                            key={index}
                            selected={selectedOption === option}
                            onClick={() => handleAnswerSelect(option)}
                        >
                            {option}
                        </OptionButton>
                    ))}
                </OptionsContainer>
            </QuestionContainer>
            <SubmitButtonWrapper>
                <SubmitButton
                    onClick={handleNextOrFinish}
                    disabled={!selectedOption}
                >
                    {currentQuestionIndex < (examData?.questions.length || 0) - 1
                        ? "Next"
                        : "Finish"}
                </SubmitButton>
            </SubmitButtonWrapper>
        </StyledExamContainer>
    );
};

export default ExamPage;
