import styled from "styled-components";

// Main container for the exam page
export const StyledExamContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1440px;
    margin: auto;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Header section
export const ExamHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 8px;
    background-color: #f7f0ff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Exam title
export const ExamTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #4a4a4a;
    margin: 0;
`;

// Timer display in the header
export const ExamTimer = styled.div`
    font-size: 16px;
    color: #692dbd;
    font-weight: bold;
`;

// Question section
export const QuestionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Question text
export const QuestionText = styled.p`
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin: 0 0 20px;
`;

// Options container
export const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

// Individual option button
export const OptionButton = styled.button<{ selected?: boolean; correct?: boolean; incorrect?: boolean }>`
    padding: 12px;
    font-size: 16px;
    border: 2px solid ${({ selected }) => (selected ? "#692dbd" : "#ddd")};
    border-radius: 8px;
    background-color: ${({ correct, incorrect }) =>
        correct ? "#4caf50" : incorrect ? "#f44336" : "white"};
    color: ${({ correct, incorrect }) =>
        correct || incorrect ? "white" : "#333"};
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: ${({ selected, correct, incorrect }) =>
            correct
                ? "#45a049"
                : incorrect
                ? "#e53935"
                : selected
                ? "#ddd"
                : "#f0f0f0"};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }
`;

// Submit button
export const SubmitButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export const SubmitButton = styled.button`
    padding: 12px 20px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background-color: #692dbd;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: #5a24a1;
    }

    &:disabled {
        background-color: #ddd;
        color: #888;
        cursor: not-allowed;
    }
`;
