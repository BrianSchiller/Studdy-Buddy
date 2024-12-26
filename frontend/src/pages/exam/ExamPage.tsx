import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    StyledExamContainer,
    ExamHeader,
    ExamTitle,
    ExamTimer,
    RecipeContainer,
    RecipeTitle,
    RecipeText,
    AnimalContainer,
    AnimalTable,
    JobContainer,
    JobTable,
    QuestionContainer,
    QuestionText,
    InputField,
    SubmitButtonWrapper,
    SubmitButton,
} from "./styleExamPage";
import { fetchExam, submitExam } from "../../api";

interface Question {
    question: string;
    answer: string;
    text: string;
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
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [score, setScore] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState<number>(0);

    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const data = await fetchExam(topicId);
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
        const timerId = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const handleNextOrFinish = async () => {
        const updatedAnswers = { ...answers, [currentQuestionIndex]: userAnswer };
        setAnswers(updatedAnswers);

        if (currentQuestionIndex < (examData?.questions.length || 0) - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setUserAnswer("");
        } else {
            await handleSubmit(updatedAnswers);
        }
    };

    const handleSubmit = async (finalAnswers = answers) => {
    let calculatedScore = 0;

    // Function to extract the first valid number from a string
    const extractNumber = (input: string): string => {
        const match = input.match(/-?\d+(\.\d+)?/); // Match the first number (including negatives and decimals)
        return match ? match[0] : "";
    };

    examData?.questions.forEach((q, index) => {
        const userAnswerNumber = extractNumber(finalAnswers[index] || "");
        const correctAnswerNumber = extractNumber(q.answer);

        if (userAnswerNumber === correctAnswerNumber) {
            calculatedScore += 1;
        }
    });

    try {
        await submitExam(examData?.id || 0, username, calculatedScore, finalAnswers, timer);
        navigate("/exam-complete", {
            state: {
                username,
                score: calculatedScore,
                totalQuestions: examData?.questions.length || 0,
                questions: examData?.questions.map((q, index) => ({
                    question: q.question,
                    correctAnswer: q.answer,
                    userAnswer: finalAnswers[index] || "No Answer",
                })),
                duration: timer,
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

    const currentQuestion = examData?.questions[currentQuestionIndex];

    return (
        <StyledExamContainer>
            <ExamHeader>
                <ExamTitle>{examData?.exam_text}</ExamTitle>
                <ExamTimer>Elapsed Time: {formatTime(timer)}</ExamTimer>
            </ExamHeader>

            {topicId === 4 ? (
                // Custom Design for Animals (topicId: 4)
                <AnimalContainer>
                    <RecipeTitle>Animal Weights</RecipeTitle>
                    <AnimalTable>
                        {currentQuestion?.text.split("\r\n").map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </AnimalTable>
                </AnimalContainer>
            ) : topicId === 3 ? (
                // Custom Design for Jobs (topicId: 3)
                <JobContainer>
                    <RecipeTitle>Yearly Salary List</RecipeTitle>
                    <JobTable>
                        {currentQuestion?.text.split("\r\n").map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </JobTable>
                </JobContainer>
            ) : (
                // Standard Design for Recipes
                <RecipeContainer>
                    <RecipeTitle>Recipe:</RecipeTitle>
                    <RecipeText>
                        {currentQuestion?.text.split("\r\n").map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </RecipeText>
                </RecipeContainer>
            )}

            <QuestionContainer>
                <QuestionText>{currentQuestion?.question} <span>(Only enter the number)</span> </QuestionText>
                <InputField
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer here"
                />
            </QuestionContainer>
            <SubmitButtonWrapper>
                <SubmitButton onClick={handleNextOrFinish} disabled={!userAnswer.trim()}>
                    {currentQuestionIndex < (examData?.questions.length || 0) - 1 ? "Next" : "Finish"}
                </SubmitButton>
            </SubmitButtonWrapper>
        </StyledExamContainer>
    );
};

export default ExamPage;
