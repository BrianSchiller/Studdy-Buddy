import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1440px;
    height: 90vh;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.6);
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
`;

export const SentenceContainer = styled.div`
    text-align: center;
    margin: 150px 0;
`;

export const WordOptionsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    align-items: center;
`;

export const StyledWordButton = styled.button<{ selected?: boolean; correct?: boolean }>`
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background-color: ${({ selected, correct }) =>
        correct ? "green" : selected ? "#2196F3" : "white"};
    color: ${({ correct }) => (correct ? "white" : "black")};
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: ${({ selected, correct }) =>
            correct ? "darkgreen" : selected ? "#1976D2" : "#f0f0f0"};
    }

    transition: background-color 0.3s ease-in-out;
`;

export const NextButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;

    @media (max-width: 768px) {
        margin-top: 15px;
    }
`;

export const ProgressBar = styled.div<{ progress: number }>`
    width: 100%;
    height: 8px;
    background-color: #ddd;
    position: relative;
    margin-top: 10px;
    border-radius: 5px;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0;
        background-color: #4caf50;
        transition: width 0.5s ease-in-out;
        width: ${({ progress }) => `${progress}%`};
    }
`;

// export const NavigationHeader = styled.div`
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//     padding: 10px 20px;
//     background-color: rgba(240, 240, 240, 0.8);
//     border-bottom: 1px solid rgba(200, 200, 200, 0.5);
//     position: sticky;
//     top: 0;
//     z-index: 1000;
// `;
