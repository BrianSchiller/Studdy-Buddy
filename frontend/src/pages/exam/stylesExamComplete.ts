import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1440px;
    height: 90vh;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f9;
    padding: 20px;
`;

export const ResultsPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 40px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-width: 800px;
    width: 100%;
`;

export const StyledTable = styled.table`
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;

    th, td {
        border: 1px solid #e0e0e0;
        text-align: center;
        padding: 15px;
    }

    th {
        background-color: #6c63ff;
        color: white;
        font-size: 18px;
        font-weight: bold;
        text-transform: uppercase;
    }

    td {
        font-size: 16px;
        color: #333;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:nth-child(odd) {
        background-color: #ffffff;
    }
`;

export const ButtonWrapper = styled.div`
    margin-top: 30px;

    button {
        background-color: #6c63ff;
        color: white;
        padding: 12px 24px;
        font-size: 16px;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
            background-color: #5a54d3;
        }

        &:active {
            background-color: #4b45b3;
            transform: scale(0.98);
        }
    }
`;
