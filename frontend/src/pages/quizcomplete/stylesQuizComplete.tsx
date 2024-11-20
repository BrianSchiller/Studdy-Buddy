import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #f8f9fa;
`;

export const ResultsPanel = styled.div`
    text-align: center;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 60%;
`;

export const StyledTable = styled.table`
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;

    th, td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: left;
    }

    th {
        background-color: #f4f4f4;
        font-weight: bold;
    }
`;
