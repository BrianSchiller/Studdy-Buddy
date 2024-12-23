import React from "react";
import { WordGrid, FlagHeader, WordCard, ImageCard, WordPairRow } from "./stylesWordPairQuiz";

interface WordPairQuizComponentProps {
    isPicturePhase: boolean;
    shuffledEnglish: any[];
    shuffledSpanish: any[];
    selectedEnglish: number | null;
    selectedSpanish: number | null;
    shake: boolean;
    onWordClick: (id: number, type: "english" | "spanish") => void;
}

const WordPairQuizComponent: React.FC<WordPairQuizComponentProps> = ({
    isPicturePhase,
    shuffledEnglish,
    shuffledSpanish,
    selectedEnglish,
    selectedSpanish,
    shake,
    onWordClick,
}) => {
    return (
        <WordPairRow>
            {/* Left Column: English Words/Images */}
            <WordGrid style={{ display: isPicturePhase ? "grid" : "flex", gridTemplateColumns: isPicturePhase ? "repeat(2, 1fr)" : "none" }}>
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
                            shake={shake}
                            imageUrl={word.picture}
                            onClick={() => onWordClick(word.id, "english")}
                        />
                    ) : (
                        <WordCard
                            key={`english-${word.id}`}
                            selected={selectedEnglish === word.id}
                            shake={shake}
                            onClick={() => onWordClick(word.id, "english")}
                        >
                            {word.english}
                        </WordCard>
                    )
                )}
            </WordGrid>

            {/* Right Column: Spanish Words */}
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
                        shake={shake}
                        onClick={() => onWordClick(word.id, "spanish")}
                    >
                        {word.spanish}
                    </WordCard>
                ))}
            </WordGrid>
        </WordPairRow>
    );
};

export default WordPairQuizComponent;
