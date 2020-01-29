import React from 'react'
import styled from 'styled-components'

const SubSection = ({ title, subtitle, children }) => (
    <>
        <Subhead>{title}</Subhead>
        <Caption>{subtitle}</Caption>
        {children}
    </>
)

const Subhead = styled.h3`
    font-family: 'Roboto Slab';
    margin: 0;
    margin-top: 30px;
`

const Caption = styled.p`
    margin: 8px 0 16px;
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.6);
`

export default SubSection
