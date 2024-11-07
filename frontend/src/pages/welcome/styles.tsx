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
    gap: 8px;
    width: 40%;
    overflow-y: auto;
`

export const DashboardLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 60%;
`


export const CardBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    flex-wrap: wrap;
    overflow-y: auto;
`

