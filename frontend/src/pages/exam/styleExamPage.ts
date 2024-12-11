import styled from "styled-components";

// Hauptcontainer für die ExamPage
export const StyledExamContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// Header für den Titel und die Timer-Anzeige
export const ExamHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: center;
    padding: 20px;
    background-color: #f7f0ff;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const ExamTitle = styled.h1`
    font-size: 28px;
    font-weight: bold;
    color: #4a4a4a;
    margin: 0;
`;

export const ExamTimer = styled.div`
    font-size: 18px;
    color: #692dbd;
    font-weight: bold;
`;

// Container für das Rezept
export const RecipeContainer = styled.div`
    background-color: #f1f1f1;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    line-height: 1.6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const RecipeTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
`;

export const RecipeText = styled.div`
    font-size: 16px;
    color: #555;
`;

// Container für die Frage
export const QuestionContainer = styled.div`
    padding: 20px;
    background-color: #fafafa;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
`;

export const QuestionText = styled.p`
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin-bottom: 15px;
`;

// Eingabefeld für die Antwort
export const InputField = styled.input`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:focus {
        outline: none;
        border-color: #692dbd;
        box-shadow: 0 0 5px rgba(105, 45, 189, 0.5);
    }
`;

// Container für den Submit-Button
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

// Container for displaying animal weights
export const AnimalContainer = styled.div`
    background-color: #f0f9ff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Table-like structure for animal weights
export const AnimalTable = styled.div`
    font-family: monospace;
    white-space: pre-line;
    color: #333;
    font-size: 16px;
    line-height: 1.6;
`;