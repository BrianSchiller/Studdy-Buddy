import React from 'react';
import styled from "styled-components";

interface ButtonProps {
    size?: string;
}

const StyledButton = styled.button<{ $size?: string }>`
    width: ${({ $size }) => $size || '70px'};
    height: 20px;
    background-color: #692DBD;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 12px;
    cursor: pointer;
`


export const Button = (
    { size, children }: React.PropsWithChildren<ButtonProps>
) => {
    const sizes = {
        small: '100px',
        medium: '150px',
        large: '200px'
    }
       return (
        <StyledButton $size={sizes[size as keyof typeof sizes]}>
            {children}
        </StyledButton>
    )
}