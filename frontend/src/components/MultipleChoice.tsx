import React from "react";
import styled from "styled-components";

interface StyledMultipleChoiceProps {
    $width?: string;
    $padding?: string;
    $radius?: boolean;
    $shadow?: boolean;
    $backgroundColor?: string;
}

interface MultipleChoiceProps {
    question: string;
    options: string[];
    onAnswerSelect: (answer: string) => void;
    selectedAnswer: string | null;
    correctAnswer: string | null;
    width?: string;
    padding?: string;
    radius?: boolean;
    shadow?: boolean;
    backgroundColor?: string;
}

const StyledMultipleChoice = styled.div<StyledMultipleChoiceProps>`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: ${({ $width }) => $width || "100%"};
    padding: ${({ $padding }) => $padding || "20px"};
    background-color: ${({ $backgroundColor }) => $backgroundColor || "rgba(255, 255, 255, 0.9)"};
    border-radius: ${({ $radius }) => ($radius ? "10px" : "0px")};
    box-shadow: ${({ $shadow }) => ($shadow ? "0 0 10px rgba(0, 0, 0, 0.1)" : "none")};
`;

const OptionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    justify-items: center;
`;

const StyledOptionWrapper = styled.div<{
    $isSelected: boolean;
    $isCorrect: boolean;
    $isIncorrect: boolean;
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: ${({ $isSelected, $isCorrect, $isIncorrect }) =>
        $isCorrect
            ? "3px solid #4CAF50" // Green
            : $isIncorrect
            ? "3px solid #F44336" // Red
            : $isSelected
            ? "3px solid #2196F3" // Blue
            : "3px solid transparent"};
    border-radius: 12px;
    transition: all 0.3s ease;
    margin: 8px;
`;

const StyledOptionButton = styled.button<{
    $isSelected: boolean;
    $isCorrect: boolean;
    $isIncorrect: boolean;
}>`
    width: 150px;
    height: 50px;
    background-color: ${({ $isSelected, $isCorrect, $isIncorrect }) =>
        $isCorrect
            ? "#A5D6A7"
            : $isIncorrect
            ? "#EF9A9A"
            : $isSelected
            ? "#2196F3"
            : "#DDCDFC99"};
    color: black;
    border-radius: 12px;
    font-size: 16px;
    cursor: ${({ $isCorrect, $isIncorrect }) => ($isCorrect || $isIncorrect ? "default" : "pointer")};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ $isSelected, $isCorrect, $isIncorrect }) =>
            !$isCorrect && !$isIncorrect ? ($isSelected ? "#1E88E5" : "#B0A0D9") : "inherit"};
    }
`;

export const MultipleChoice = ({
    question,
    options,
    onAnswerSelect,
    selectedAnswer,
    correctAnswer,
}: MultipleChoiceProps) => {
    const handleOptionClick = (option: string) => {
        if (correctAnswer === null) {
            onAnswerSelect(option);
        }
    };

    return (
        <StyledMultipleChoice>
            <h3>{question}</h3>
            <OptionsGrid>
                {options.map((option, index) => (
                    <StyledOptionWrapper
                        key={index}
                        $isSelected={selectedAnswer === option}
                        $isCorrect={correctAnswer === option && selectedAnswer !== null}
                        $isIncorrect={selectedAnswer === option && correctAnswer !== option}
                    >
                        <StyledOptionButton
                            $isSelected={selectedAnswer === option}
                            $isCorrect={correctAnswer === option}
                            $isIncorrect={selectedAnswer === option && correctAnswer !== option}
                            onClick={() => handleOptionClick(option)}
                            disabled={correctAnswer !== null}
                        >
                            {option}
                        </StyledOptionButton>
                    </StyledOptionWrapper>
                ))}
            </OptionsGrid>
        </StyledMultipleChoice>
    );
};
