import styled from 'styled-components';

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
`;

export const QuizOptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    width: 80%;
    max-width: 500px;
`;

export const QuizButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #e0e0e0;
        border-color: #ccc;
    }

    & h3 {
        margin: 0;
    }
`;
