import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    disabled?: boolean; // For disabled state
    backgroundColor?: string; // For customizing background color
    textColor?: string; // For customizing text color
}

const StyledButton = styled.button<{ $size?: string; $disabled?: boolean; $backgroundColor?: string; $textColor?: string }>`
    width: ${({ $size }) => $size || '70px'};
    height: 40px; /* Increased height for better button size */
    background-color: ${({ $disabled, $backgroundColor }) =>
        $disabled ? '#ddd' : $backgroundColor || '#692DBD'}; /* Use prop or default color */
    color: ${({ $disabled, $textColor }) => ($disabled ? '#888' : $textColor || 'white')}; /* Use prop or default color */
    border: none;
    border-radius: 10px;
    font-size: 14px; /* Adjusted font size */
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
    size = 'small',
    onClick,
    disabled = false,
    backgroundColor, // Allow custom background color
    textColor, // Allow custom text color
    children,
}) => {
    const sizes = {
        small: '100px',
        medium: '150px',
        large: '200px',
    };

    return (
        <StyledButton
            $size={sizes[size]}
            onClick={onClick}
            $disabled={disabled}
            $backgroundColor={backgroundColor}
            $textColor={textColor}
            disabled={disabled}
        >
            {children}
        </StyledButton>
    );
};
