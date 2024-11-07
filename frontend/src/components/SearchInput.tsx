import React from 'react';
import styled from "styled-components";

interface SearchInputProps {
    type: string;
    placeholder: string;
}

const StyledSearchInput = styled.input`
    width: 400px;
    height: 40px;
    padding: 8px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const SearchInput = (
    { type, placeholder }: React.PropsWithChildren<SearchInputProps>
) => {
    return (
        <StyledSearchInput type={type} placeholder={placeholder} />
    )
}