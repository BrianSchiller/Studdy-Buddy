import React from 'react';
import styled from "styled-components";

interface TextProps {
    size?: string;
    weight?: string;
    color?: string;
}

interface StyledTextProps {
    $size?: string;
    $weight?: string;
    $color?: string;
}

const StyledText = styled.p<StyledTextProps>`
    font-size: ${({ $size }) => $size || '16px'};
    font-weight: ${({ $weight }) => $weight || 'normal'};
    color: ${({ $color }) => $color || 'black'};
`


export const Text = (
    { size, weight, color, children }: React.PropsWithChildren<TextProps>
) => {
       return (
        <StyledText $size={size} $weight={weight} $color={color}>
            {children}
        </StyledText>
    )
}