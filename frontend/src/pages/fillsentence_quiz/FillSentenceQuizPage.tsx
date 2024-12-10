import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "../../components/Text";
import { Menu } from "../../components/Menu";
import { Button } from "../../components/Button";
import { NavigationHeader } from "../../components/NavigationHeader";
import { fetchVocabWords, fetchRandomWords, updateUserProgress } from "../../api";
import {
    DashboardPanel,
    StyledContainer,
    SentenceContainer,
    WordOptionsContainer,
    StyledWordButton,
    NextButtonWrapper,
} from "./stylesFillSentence";

interface FillSentenceQuestion {
    sentence: string;
    correctAnswer: string;
    options: string[];
}

const shuffleAndLimit = <T,>(array: T[], limit: number): T[] => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
};

const FillSentenceQuizPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const username = location.state?.username || "Guest";
    const topicId = location.state?.topicId;
    const [questions, setQuestions] = useState<FillSentenceQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const [buttonState, setButtonState] = useState<"check" | "next">("check");
    const [timer, setTimer] = useState<number>(0);

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const vocabWords = await fetchVocabWords(topicId);
                const limitedWords = shuffleAndLimit(vocabWords, 10);
                const fillSentenceQuestions: FillSentenceQuestion[] = [];

                for (const word of limitedWords) {
                    const randomWords = await fetchRandomWords(6);
                    const filteredRandomWords = randomWords.filter((rw) => rw.spanish !== word.spanish);
                    const options = [...filteredRandomWords.map((rw) => rw.spanish), word.spanish].sort(
                        () => Math.random() - 0.5
                    );

                    fillSentenceQuestions.push({
                        sentence: word.sentence,
                        correctAnswer: word.spanish,
                        options,
                    });
                }

                setQuestions(fillSentenceQuestions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false);
            }
        };

        loadQuestions();

        const timerId = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [topicId]);

    const handleWordSelect = (word: string) => {
        if (buttonState === "check") {
            setSelectedWord(word);
        }
    };

    const handleCheck = () => {
        if (selectedWord) {
            setIsCorrect(selectedWord === questions[currentIndex].correctAnswer);
            if (selectedWord === questions[currentIndex].correctAnswer) {
                setScore((prev) => prev + 1);
            }
            setButtonState("next");
        }
    };

    const handleNext = async () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedWord(null);
            setIsCorrect(null);
            setButtonState("check");
        } else {
            const mistakes = questions.length - score;
            try {
                // Statischen Level auf 4 setzen, um Duplikate zu vermeiden
                await updateUserProgress(username, topicId, mistakes, timer);
            } catch (error) {
                console.error("Error updating progress:", error);
            }

            navigate("/quiz-complete", { state: { username, topicId, score, total: questions.length } });
        }
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
                <NavigationHeader
                    title="Complete the sentence"
                    imageSrc="https://placehold.co/95"
                    progress={(currentIndex / questions.length) * 100}
                    currentIndex={currentIndex}
                    totalQuestions={questions.length}
                    timer={timer}
                />
                <SentenceContainer>
                    <Text size="20px" weight="bold">
                        {questions[currentIndex].sentence}
                    </Text>
                </SentenceContainer>
                <WordOptionsContainer>
                    {questions[currentIndex].options.map((option, index) => (
                        <StyledWordButton
                            key={index}
                            onClick={() => handleWordSelect(option)}
                            selected={option === selectedWord}
                            correct={isCorrect !== null && option === questions[currentIndex].correctAnswer}
                        >
                            {option}
                        </StyledWordButton>
                    ))}
                </WordOptionsContainer>
                <NextButtonWrapper>
                    {buttonState === "check" ? (
                        <Button onClick={handleCheck} disabled={selectedWord === null}>
                            Check
                        </Button>
                    ) : (
                        <Button onClick={handleNext}>
                            {currentIndex === questions.length - 1 ? "Finish" : "Next"}
                        </Button>
                    )}
                </NextButtonWrapper>
            </DashboardPanel>
        </StyledContainer>
    );
};

export default FillSentenceQuizPage;
