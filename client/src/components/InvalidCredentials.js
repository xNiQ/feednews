import React from 'react';
import styled from 'styled-components';

const InvalidCredentials = () => {
    const Wrapper = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
        height: 5%;
        background-color: red;
        border: solid 1px black;
        padding: 5px;
        opacity: 0.8;
        margin: 2%;
    `

    const FlashMessage = styled.h2`
        font-size: 12px;
        color: white;
    `

    return(
        <Wrapper>
            <FlashMessage>Niepoprawne dane logowania!</FlashMessage>
        </Wrapper>
    )
};

export default InvalidCredentials;
