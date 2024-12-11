import styled from "styled-components";

interface StyledFlexProps {
    $direction?: string;
    $justify?: string;
    $align?: string;
}

export const StyledFlex = styled.div<StyledFlexProps>`
    display: flex;
    justify-content: ${({ $justify }) => $justify || "start"};
    align-items: ${({ $align }) => $align || "center"};
    gap: 12px; // Increased gap for better spacing
    flex-direction: ${({ $direction }) => $direction || "row"};
    flex-wrap: wrap; // Allow wrapping for responsiveness
`;

// Main container with a gradient background and shadow
export const StyledContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1440px;
    height: 90vh;
    border-radius: 12px;
    background: linear-gradient(135deg, #f0f4f8, #e6ebf2);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    padding: 20px;
`;

// Dashboard panel with refined styling and shadow
export const DashboardPanel = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin: 20px;
    padding: 25px;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    overflow: hidden;
`;

// Right panel with better spacing and shadow
export const DashboardRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 40%;
    padding: 20px;
    background-color: #f9fafb;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    max-height: 80vh;

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin-bottom: 12px;
        background-color: #ffffff;
        padding: 12px;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease;

        &:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
    }
`;

// Left panel with increased gap
export const DashboardLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 60%;
`;

// CardBox with responsive design
export const CardBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    flex-wrap: wrap;
    overflow-y: auto;
    justify-content: flex-start;

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

// Button with refined styling and hover effect
export const StyledButton = styled.button<{ $isEnabled?: boolean }>`
    padding: 12px 18px;
    margin-top: 10px;
    font-size: 15px;
    font-weight: bold;
    color: white;
    background-color: ${({ $isEnabled }) => ($isEnabled ? "#4caf50" : "#bdbdbd")};
    border: none;
    border-radius: 8px;
    cursor: ${({ $isEnabled }) => ($isEnabled ? "pointer" : "not-allowed")};
    opacity: ${({ $isEnabled }) => ($isEnabled ? 1 : 0.6)};
    transition: background-color 0.3s ease-in-out, transform 0.2s ease;

    &:hover {
        background-color: ${({ $isEnabled }) => ($isEnabled ? "#45a049" : "#bdbdbd")};
        transform: ${({ $isEnabled }) => ($isEnabled ? "translateY(-2px)" : "none")};
    }

    &:active {
        transform: ${({ $isEnabled }) => ($isEnabled ? "translateY(1px)" : "none")};
    }
`;
