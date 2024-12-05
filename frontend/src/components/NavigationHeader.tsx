import styled from "styled-components";
import React from "react";

interface NavigationHeaderProps {
    title: string;
    imageSrc: string;
    currentIndex?: number;
    totalQuestions?: number;
    progress: number; // Progress percentage
    timer?: number; // Timer in seconds
}

// Updated Container to span the width of the parent container
const NavigationHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%; /* Ensures full width */
    padding: 16px;
    border-radius: 12px;
    background-color: #f7f0ff; /* Light purple background */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%; /* Ensures header items span full width */
`;

const TitleWithImage = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const TitleText = styled.h3`
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: #2c2c2c;
`;

const IconImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: contain;
    border-radius: 8px;
`;

const ProgressText = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: #5a5a5a;
`;

const ProgressBarContainer = styled.div`
    width: 100%;
    height: 10px; /* Slightly larger for better visibility */
    background-color: #e0d4f9; /* Light purple */
    border-radius: 5px;
    overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
    height: 100%;
    background-color: #9e7dff; /* Purple progress */
    transition: width 0.4s ease-in-out;
    width: ${({ progress }) => `${progress}%`};
`;

// Add styled component for the timer display
const TimerText = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #5a5a5a;
    text-align: right;
    margin-top: 8px;
`;




export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
    title,
    imageSrc,
    currentIndex,
    totalQuestions,
    progress,
    timer,
}) => {
    return (
        <NavigationHeaderContainer>
            <HeaderRow>
                <TitleWithImage>
                    <IconImage src={imageSrc} alt="Quiz Icon" />
                    <TitleText>{title}</TitleText>
                </TitleWithImage>
                <ProgressText>
                    {currentIndex !== undefined && totalQuestions !== undefined
                        ? `${currentIndex + 1} / ${totalQuestions}`
                        : ""}
                </ProgressText>
            </HeaderRow>
            <ProgressBarContainer>
                <ProgressFill progress={progress} />
            </ProgressBarContainer>
            {timer !== undefined && (
                <TimerText>
                    <strong>Time:</strong> {timer} seconds
                </TimerText>
            )}
        </NavigationHeaderContainer>
    );
};


