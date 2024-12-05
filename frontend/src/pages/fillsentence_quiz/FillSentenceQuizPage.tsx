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
    sentence: string; // Incomplete sentence
    correctAnswer: string; // Correct Spanish word
    options: string[]; // Randomized options
}

// Utility function to shuffle and limit array size
const shuffleAndLimit = <T,>(array: T[], limit: number): T[] => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
};

const FillSentenceQuizPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const username = location.state?.username || "Guest"; // Extract username from state
    const topicId = location.state?.topicId; // Extract topicId from state

    // States
    const [questions, setQuestions] = useState<FillSentenceQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const [buttonState, setButtonState] = useState<"check" | "next">("check");

    // Fetch and prepare quiz questions
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const vocabWords = await fetchVocabWords(topicId);
                const limitedWords = shuffleAndLimit(vocabWords, 10); // Limit to 10 questions
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
    }, [topicId]);

    // Handle word selection
    const handleWordSelect = (word: string) => {
        if (buttonState === "check") {
            setSelectedWord(word);
        }
    };

    // Handle Check button
    const handleCheck = () => {
        if (selectedWord) {
            setIsCorrect(selectedWord === questions[currentIndex].correctAnswer);
            if (selectedWord === questions[currentIndex].correctAnswer) {
                setScore((prev) => prev + 1);
            }
            setButtonState("next");
        }
    };

    // Handle Next button
    const handleNext = async () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedWord(null);
            setIsCorrect(null);
            setButtonState("check");
        } else {
            const mistakes = questions.length - score;

            try {
                await updateUserProgress(username, topicId, mistakes);
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
                    imageSrc="https://placehold.co/95" // Replace with your image path or URL
                    progress={(currentIndex / questions.length) * 100}
                    currentIndex={currentIndex}
                    totalQuestions={questions.length}
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
