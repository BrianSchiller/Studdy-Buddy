import React, { useState } from "react";
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

const ExamPage: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        console.log("Exam submitted with option:", selectedOption);
    };

    return (
        <StyledExamContainer>
            <ExamHeader>
                <ExamTitle>Exam Title</ExamTitle>
                <ExamTimer>Time Remaining: 10:00</ExamTimer>
            </ExamHeader>

            <QuestionContainer>
                <QuestionText>
                    What is the name of this ice cream? ... - split
                </QuestionText>
                <OptionsContainer>
                    {["Option 1", "Option 2", "Option 3", "Option 4"].map((option) => (
                        <OptionButton
                            key={option}
                            selected={selectedOption === option}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </OptionButton>
                    ))}
                </OptionsContainer>
            </QuestionContainer>

            <SubmitButtonWrapper>
                <SubmitButton
                    disabled={!selectedOption}
                    onClick={handleSubmit}
                >
                    Submit Exam
                </SubmitButton>
            </SubmitButtonWrapper>
        </StyledExamContainer>
    );
};

export default ExamPage;
