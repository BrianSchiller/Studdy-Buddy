import React from 'react';
import styled from 'styled-components';

interface StyledCardProps {
    $radius?: boolean;
    $shadow?: boolean;
    $color?: string;
    $width?: string;
    $minheight?: string;
}

interface CardProps {
    radius?: boolean;
    shadow?: boolean;
    color?: string;
    width?: string;
    minheight?: string;
    children: React.ReactNode;
}

// Styled Component
const StyledCard = styled.div<StyledCardProps>`
    width: ${({ $width }) => $width || 'auto'};
    padding: 20px;
    background-color: ${({ $color }) => $color || '#ffffff'};
    color: ${({ $color }) => ($color ? '#ffffff' : '#333')};
    border-radius: ${({ $radius }) => ($radius ? '10px' : '0px')};
    box-shadow: ${({ $shadow }) => ($shadow ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none')};
    min-height: ${({ $minheight }) => $minheight || '100px'};
    transition: box-shadow 0.3s ease, transform 0.3s ease;

    &:hover {
        box-shadow: ${({ $shadow }) => ($shadow ? '0 6px 18px rgba(0, 0, 0, 0.15)' : 'none')};
        transform: ${({ $shadow }) => ($shadow ? 'translateY(-5px)' : 'none')};
    }
`;

// Card Component
export const Card: React.FC<CardProps> = ({
    radius,
    shadow,
    color,
    width,
    children,
    minheight,
}) => {
    return (
        <StyledCard
            $radius={radius}
            $shadow={shadow}
            $color={color}
            $width={width}
            $minheight={minheight}
        >
            {children}
        </StyledCard>
    );
};
