// stylesExamComplete.ts
import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1440px;
    height: 90vh;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.6);
`;

export const ResultsPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const StyledTable = styled.table`
    width: 80%;
    margin: 20px 0;
    border-collapse: collapse;

    th, td {
        border: 1px solid #ddd;
        text-align: center;
        padding: 10px;
    }

    th {
        background-color: #4CAF50;
        color: white;
    }

    td {
        font-size: 16px;
    }
`;

export const ButtonWrapper = styled.div`
    margin-top: 20px;
    button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 8px;
        cursor: pointer;

        &:hover {
            background-color: #45a049;
        }
    }
`;
