import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "../../components/Text";
import { Menu } from "../../components/Menu";
import { shuffleArray } from "../../utils/shuffleArray";
import { fetchVocabWords, updateUserProgress } from "../../api";
import { NavigationHeader } from "../../components/NavigationHeader";
import {
    StyledContainer,
    DashboardPanel,
    WordGrid,
    WordCard,
    WordPairRow,
    ImageCard,
    FlagHeader,
} from "./stylesWordPairQuiz";

interface WordPair {
    id: number;
    english: string;
    spanish: string;
    matched: boolean;
    picture: string;
}

const WordPairQuizPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const username = location.state?.username || "Guest";
    const topicId = location.state?.topicId;

    const [words, setWords] = useState<WordPair[]>([]);
    const [shuffledEnglish, setShuffledEnglish] = useState<WordPair[]>([]);
    const [shuffledSpanish, setShuffledSpanish] = useState<WordPair[]>([]);
    const [selectedEnglish, setSelectedEnglish] = useState<number | null>(null);
    const [selectedSpanish, setSelectedSpanish] = useState<number | null>(null);
    const [timer, setTimer] = useState<number>(0);
    const [mistakes, setMistakes] = useState<number>(0);
    const [currentSetIndex, setCurrentSetIndex] = useState<number>(0);
    const pairsPerSet = 5;
    const [isPicturePhase, setIsPicturePhase] = useState<boolean>(false);

    useEffect(() => {
        const initializeQuiz = async () => {
            const vocabWords = await fetchVocabWords(topicId);

            const selectedWords = shuffleArray(vocabWords).slice(0, 10);

            const wordPairs = selectedWords.map((word, index) => ({
                id: word.id,
                english: word.english,
                spanish: word.spanish,
                matched: false,
                picture: `https://placehold.co/100x100?text=Image+${index + 1}`,
            }));

            setWords(wordPairs);
            updateCurrentSet(wordPairs, 0);
        };

        const startTimer = () => {
            const timerId = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);

            return timerId;
        };

        initializeQuiz();
        const timerId = startTimer();

        return () => clearInterval(timerId);
    }, [topicId]);

    const updateCurrentSet = (wordPairs: WordPair[], setIndex: number) => {
        const currentSet = wordPairs.slice(setIndex * pairsPerSet, (setIndex + 1) * pairsPerSet);
        setShuffledEnglish(shuffleArray(currentSet));
        setShuffledSpanish(shuffleArray(currentSet));
        setIsPicturePhase(setIndex > 0);
    };

    const handleWordClick = (id: number, type: "english" | "spanish") => {
        if (type === "english") {
            setSelectedEnglish((prev) => (prev === id ? null : id));
        } else {
            setSelectedSpanish((prev) => (prev === id ? null : id));
        }
    };

    useEffect(() => {
        if (selectedEnglish && selectedSpanish) {
            const englishWord = words.find((word) => word.id === selectedEnglish);
            const spanishWord = words.find((word) => word.id === selectedSpanish);

            if (englishWord && spanishWord && englishWord.id === spanishWord.id) {
                setWords((prevWords) =>
                    prevWords.map((word) =>
                        word.id === englishWord.id ? { ...word, matched: true } : word
                    )
                );
                setShuffledEnglish((prev) => prev.filter((word) => word.id !== englishWord.id));
                setShuffledSpanish((prev) => prev.filter((word) => word.id !== spanishWord.id));
            } else {
                setMistakes((prev) => prev + 1);
            }

            setSelectedEnglish(null);
            setSelectedSpanish(null);
        }
    }, [selectedEnglish, selectedSpanish, words]);

    useEffect(() => {
        const currentSetMatched =
            getCurrentSet(words).every((word) => word.matched) &&
            getCurrentSet(words).length > 0;

        if (currentSetMatched && !isLastSet()) {
            const nextSetIndex = currentSetIndex + 1;
            setCurrentSetIndex(nextSetIndex);
            updateCurrentSet(words, nextSetIndex);
        } else if (words.length > 0 && words.every((word) => word.matched)) {
            updateUserProgress(username, topicId, mistakes, timer);
            navigate("/wordpair-quiz-complete", {
                state: { username, topicId, timer, mistakes },
            });
        }
    }, [words, currentSetIndex, navigate, topicId, username, mistakes, timer]);

    const getCurrentSet = (array: WordPair[]) => {
        return array.slice(currentSetIndex * pairsPerSet, (currentSetIndex + 1) * pairsPerSet);
    };

    const isLastSet = () => {
        return (currentSetIndex + 1) * pairsPerSet >= words.length;
    };

    return (
        <StyledContainer>
            <Menu />
            <DashboardPanel>
                <NavigationHeader
                    title="Match the Word Pairs"
                    imageSrc="https://placehold.co/95"
                    progress={(words.filter((word) => word.matched).length / words.length) * 100}
                    timer={timer}
                />
                <WordPairRow>
                    <WordGrid>
                        <FlagHeader>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
                                alt="English Flag"
                            />
                            English
                        </FlagHeader>
                        {shuffledEnglish.map((word) =>
                            isPicturePhase ? (
                                <ImageCard
                                    key={`image-${word.id}`}
                                    selected={selectedEnglish === word.id}
                                    onClick={() => handleWordClick(word.id, "english")}
                                >
                                    <img src={word.picture} alt={word.english} />
                                </ImageCard>
                            ) : (
                                <WordCard
                                    key={`english-${word.id}`}
                                    selected={selectedEnglish === word.id}
                                    onClick={() => handleWordClick(word.id, "english")}
                                >
                                    {word.english}
                                </WordCard>
                            )
                        )}
                    </WordGrid>
                    <WordGrid>
                        <FlagHeader>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/1200px-Flag_of_Spain.svg.png"
                                alt="Spanish Flag"
                            />
                            Spanish
                        </FlagHeader>
                        {shuffledSpanish.map((word) => (
                            <WordCard
                                key={`spanish-${word.id}`}
                                selected={selectedSpanish === word.id}
                                onClick={() => handleWordClick(word.id, "spanish")}
                            >
                                {word.spanish}
                            </WordCard>
                        ))}
                    </WordGrid>
                </WordPairRow>
            </DashboardPanel>
        </StyledContainer>
    );
};

export default WordPairQuizPage;
