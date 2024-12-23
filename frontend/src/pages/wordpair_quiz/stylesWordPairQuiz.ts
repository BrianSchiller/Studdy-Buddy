import styled, { keyframes, css } from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1440px;
    height: 90vh;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.6);

    @media (max-width: 768px) {
        height: auto;
        padding: 5px;
    }
`;

export const DashboardPanel = styled.div`
    width: 80%;
    display: flex;
    height: 80vh;
    flex-direction: column;
    gap: 20px;
    margin: 30px 30px 30px 0;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 10px;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

export const TimerDisplay = styled.div`
    text-align: right;
    margin-bottom: 10px;
`;

export const ProgressBar = styled.div<{ progress: number }>`
    width: 100%;
    height: 8px;
    background-color: #ddd;
    border-radius: 5px;
    overflow: hidden;
    margin: 10px 0;

    &::after {
        content: '';
        display: block;
        height: 100%;
        width: ${({ progress }) => `${progress}%`};
        background-color: #4caf50;
        transition: width 0.3s ease-in-out;
    }
`;

export const WordPairRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
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

// Wackel-Animation definieren
const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

// WordCard mit Shake-Animation
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

export const ImageCard = styled.div<{ selected?: boolean; shake?: boolean; imageUrl?: string }>`
    width: 100px;
    height: 100px;
    background-color: ${({ selected }) => (selected ? "#2196F3" : "#f5f5f5")};
    background-image: url(${({ imageUrl }) => imageUrl});
    background-size: cover;
    background-position: center;
    border: 1px solid ${({ selected }) => (selected ? "#1976D2" : "#ddd")};
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);

    ${({ shake }) =>
        shake &&
        css`
            animation: ${shakeAnimation} 0.3s ease-in-out;
        `}

    &:hover {
        background-color: ${({ selected }) => (selected ? "#1976D2" : "#e0e0e0")};
        background-blend-mode: multiply;
    }

    transition: all 0.3s ease;

    @media (max-width: 480px) {
        width: 80px;
        height: 80px;
    }
`;


export const FlagHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px; /* Space between the image and the text */
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
    color: #333;

    & img {
        width: 40px; /* Adjust flag size */
        height: auto;
        border-radius: 5px; /* Optional: Rounded corners for the flag */

         @media (max-width: 480px) {
            width: 30px;
        }
    }
`;


