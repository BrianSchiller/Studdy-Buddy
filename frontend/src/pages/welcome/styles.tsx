import styled from "styled-components";

interface StyledFlexProps {
    $direction?: string;
    $justify?: string;
    $align?: string;
}

export const StyledFlex = styled.div<StyledFlexProps>`
    display: flex;
    justify-content: ${({ $justify }) => $justify || 'start'};
    align-items: ${({ $align }) => $align || 'center'};
    gap: 8px;
    flex-direction: ${({ $direction }) => $direction || 'row'};
`

export const StyledContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1440px;
    height: 90vh;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.6);
`
export const DashboardPanel = styled.div`
    width: 80%;
    display: flex;
    height: 80vh;
    flex-direction: row;
    gap: 8px;
    margin: 30px 30px 30px 0;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
`

export const DashboardRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 40%;
    padding: 20px;
    background-color: rgba(245, 245, 245, 0.8);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    max-height: 80vh;

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin-bottom: 10px;
        background-color: white;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
`;


export const DashboardLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 60%;
`


export const CardBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    flex-wrap: wrap;
    overflow-y: auto;
`;

export const StyledButton = styled.button<{ $isEnabled?: boolean }>`
    padding: 10px 15px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: ${({ $isEnabled }) => ($isEnabled ? "#4caf50" : "#ddd")};
    border: none;
    border-radius: 8px;
    cursor: ${({ $isEnabled }) => ($isEnabled ? "pointer" : "not-allowed")};
    opacity: ${({ $isEnabled }) => ($isEnabled ? 1 : 0.6)};
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: ${({ $isEnabled }) => ($isEnabled ? "#45a049" : "#ddd")};
    }
`;