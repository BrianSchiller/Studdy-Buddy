import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
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
`;

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
    size = 'small',
    onClick,
    children,
}) => {
    const sizes = {
        small: '100px',
        medium: '150px',
        large: '200px',
    };

    return (
        <StyledButton $size={sizes[size]} onClick={onClick}>
            {children}
        </StyledButton>
    );
};
