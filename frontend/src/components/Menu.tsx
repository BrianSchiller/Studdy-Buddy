import React from 'react';
import styled from "styled-components";

const StyledContainer = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    padding-top: 80px;
    padding-left: 70px;

    h1 {
        font-size: 35px;
        font-weight: normal;
    }

    h2 {
        font-size: 40px;
        margin-bottom: 60px;
    }
    nav ul {
        display: flex;
        flex-direction: column;
        justify-content: start;
        padding: 0;
        gap: 40px;
        list-style-type: none;
        font-size: 24px;
    }
    nav ul li {
        cursor: pointer;
        padding: 10px;

        &:hover {
            background-color: rgba(255, 255, 255, 0.6);
            border-radius: 10px 0px 0px 10px;
            padding: 10px;
        }

        &:active {
            background-color: rgba(255, 255, 255, 0.6);
            border-radius: 10px 0px 0px 10px;
            padding: 10px;
        }
    }

`

export const Menu = () => {
    return (
        <StyledContainer>
            <h1>Studdy</h1>
            <h2>Buddy</h2>
            <nav>
                <ul>
                    <li>Desktop</li>
                    <li>Quiz</li>
                    <li>Courses</li>
                </ul>
            </nav>
        </StyledContainer>
    )
}