import React from 'react';
import styled from "styled-components";

interface StyledCardProps {
    $radius?: boolean;
    $shadow?: boolean;
    $color?: string;
    $width?: string;
}

interface CardProps {
    radius?: boolean;
    shadow?: boolean;
    color?: string;
    width?: string;
}

const StyledCard = styled.div<StyledCardProps>`
    width: ${({ $width }) => $width || 'auto'};
    padding: 20px;
    background-color: ${({ $color }) => $color || 'rgba(255, 255, 255)'};
    color: ${({ $color }) => $color && 'rgba(255, 255, 255)'};
    border-radius: ${({ $radius }) => $radius ? '10px' : '0px'};
    box-shadow: ${({ $shadow }) => $shadow ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none'};
    min-height: 100px;
`

export const Card = (
    { radius, shadow, color, width, children }: React.PropsWithChildren<CardProps>
) => {
    return (
        <StyledCard $radius={radius} $shadow={shadow} $color={color} $width={width}>
            {children}
        </StyledCard>
    )
}