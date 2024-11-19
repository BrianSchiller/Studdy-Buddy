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
    grid-template-columns: repeat(2, 1fr); /* 2x2 Grid */
    gap: 20px; /* Spacing between buttons */
    justify-items: center; /* Center buttons in their grid cells */
`;

const StyledOptionWrapper = styled.div<{ $isSelected: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: ${({ $isSelected }) => ($isSelected ? "3px solid #2196F3" : "3px solid transparent")};
    border-radius: 12px;
    transition: all 0.3s ease;
    margin: 8px;
`;

const StyledOptionButton = styled.button<{ $isSelected: boolean }>`
    width: 150px;
    height: 50px;
    background-color: ${({ $isSelected }) => ($isSelected ? "#2196F3" : "#DDCDFC99")}; /* Azurblau als aktive Farbe */
    color: black;
    font: Instrument Sans;
    border: 2px solid ${({ $isSelected }) => ($isSelected ? "#1976D2" : "transparent")}; /* Dunkleres Azurblau für den Rahmen */
    border-radius: 12px; /* Runde Ecken */
    font-size: 16px;
    cursor: pointer;
    margin: 10px; /* Abstand zu anderen Buttons */
    transition: background-color 0.3s ease, border-color 0.3s ease; /* Weiche Übergänge */

    &:hover {
        background-color: ${({ $isSelected }) => ($isSelected ? "#1E88E5" : "#B0A0D9")}; /* Helleres Blau beim Hover */
    }
`;


export const MultipleChoice = ({
    question,
    options,
    onAnswerSelect,
    width,
    padding,
    radius,
    shadow,
    backgroundColor,
}: MultipleChoiceProps) => {
    const [selectedOption, setSelectedOption] = React.useState<string | null>(null);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        onAnswerSelect(option);
    };

    return (
        <StyledMultipleChoice
            $width={width}
            $padding={padding}
            $radius={radius}
            $shadow={shadow}
            $backgroundColor={backgroundColor}
        >
            <h3>{question}</h3>
            <OptionsGrid>
                {options.map((option, index) => (
                    <StyledOptionWrapper key={index} $isSelected={selectedOption === option}>
                        <StyledOptionButton
                            $isSelected={selectedOption === option}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </StyledOptionButton>
                    </StyledOptionWrapper>
                ))}
            </OptionsGrid>
        </StyledMultipleChoice>
    );
};
