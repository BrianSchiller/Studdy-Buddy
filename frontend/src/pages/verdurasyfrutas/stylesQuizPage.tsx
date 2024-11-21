import styled from "styled-components";

interface StyledFlexProps {
    $direction?: string;
    $justify?: string;
    $align?: string;
    $gap?: string;
}

export const StyledFlex = styled.div<StyledFlexProps>`
    display: flex;
    justify-content: ${({ $justify }) => $justify || 'start'};
    align-items: ${({ $align }) => $align || 'center'};
    gap: ${({ $gap }) => $gap || '8px'};  // Add gap property for spacing
    flex-direction: ${({ $direction }) => $direction || 'row'};
`;

export const StyledOptionWrapper = styled.div<{ $isSelected: boolean; $isCorrect?: boolean; $isIncorrect?: boolean }>`
    border: ${({ $isSelected, $isCorrect, $isIncorrect }) =>
        $isCorrect ? '3px solid green' : $isIncorrect ? '3px solid red' : $isSelected ? '3px solid #2196F3' : '3px solid transparent'};
    transition: all 0.3s ease;
`;

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
    gap: 8px;
    margin: 30px 30px 30px 0;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
`;

export const CardBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    flex-wrap: wrap;
    overflow-y: auto;
`;

export const MultipleChoice_Quiz = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    justify-content: center;
    align-items: center; /* Centers content horizontally */
    flex-grow: 1; /* Takes all available space */
    padding-bottom: 80px; /* Ensure enough space for the footer and Next button */
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

export const NextButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;

    @media (max-width: 768px) {
        margin-top: 15px;
    }
`;

export const NavigationFooter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 95%;
    padding: 10px 20px;
    bottom: 0; /* Sticks at the bottom of the page */
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