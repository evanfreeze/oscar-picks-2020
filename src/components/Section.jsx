import React from 'react'
import styled from 'styled-components'

const Section = ({ title, id, children }) => (
    <StyledMain>
        <StyledTitle id={id}>{title}</StyledTitle>
        <article>{children}</article>
    </StyledMain>
)

const StyledMain = styled.main`
    color: black;
    padding: 10px 30px;
    padding-bottom: 30px;
    margin: 20px 10px;
    background: white;
    border-radius: 6px;
`

const StyledTitle = styled.h2`
    border-bottom: 3px solid #333;
    padding-bottom: 10px;
    font-family: 'Roboto Slab';
`

export default Section
