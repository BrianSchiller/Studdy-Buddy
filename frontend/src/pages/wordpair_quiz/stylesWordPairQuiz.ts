import styled, { keyframes, css } from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1440px;
    height: 90vh;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.6);
    padding: 10px;

    @media (max-width: 768px) {
        height: auto;
        padding: 5px;
    }
`;

export const DashboardPanel = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    overflow-y: auto;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

export const WordPairRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const WordGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 45%;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const shakeAnimation = keyframes`
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
`;

export const WordCard = styled.div<{ selected?: boolean; shake?: boolean }>`
    padding: 15px;
    font-size: 18px;
    background-color: ${({ selected }) => (selected ? "#2196F3" : "#f5f5f5")};
    color: ${({ selected }) => (selected ? "white" : "black")};
    border: 1px solid ${({ selected }) => (selected ? "#1976D2" : "#ddd")};
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    ${({ shake }) =>
        shake &&
        css`
            animation: ${shakeAnimation} 0.3s ease-in-out;
        `}

    &:hover {
        background-color: ${({ selected }) => (selected ? "#1976D2" : "#e0e0e0")};
    }

    @media (max-width: 480px) {
        font-size: 16px;
        padding: 10px;
    }
`;

export const ImageCard = styled.div<{ selected?: boolean; shake?: boolean }>`
    padding: 10px;
    background-color: ${({ selected }) => (selected ? "#2196F3" : "#f5f5f5")};
    border: 1px solid ${({ selected }) => (selected ? "#1976D2" : "#ddd")};
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;

    img {
        width: 80px;
        height: 80px;
        border-radius: 8px;

        @media (max-width: 480px) {
            width: 60px;
            height: 60px;
        }
    }

    ${({ shake }) =>
        shake &&
        css`
            animation: ${shakeAnimation} 0.3s ease-in-out;
        `}

    &:hover {
        background-color: ${({ selected }) => (selected ? "#1976D2" : "#e0e0e0")};
    }
`;

export const FlagHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
    color: #333;

    img {
        width: 40px;
        height: auto;
        border-radius: 5px;

        @media (max-width: 480px) {
            width: 30px;
        }
    }
`;