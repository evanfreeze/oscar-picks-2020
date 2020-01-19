import React from 'react'
import styled from 'styled-components'

const Nominee = ({ name, nominee, picked, setPickValue }) => {
    const handlePickChange = event => {
        const { target: value } = event
        setPickValue(value.id)
    }

    return (
        <NomineeLabel key={nominee.id} htmlFor={nominee.id}>
            <NomineeRadio
                type="radio"
                id={nominee.id}
                name={name}
                value={nominee.id}
                checked={picked}
                onChange={handlePickChange}
            />
            <NomineeImage src={nominee.image} height="100px" />
            <NomineeText>
                <NomineeTitle>{nominee.name}</NomineeTitle>
                <NomineeDescription>{nominee.description}</NomineeDescription>
            </NomineeText>
        </NomineeLabel>
    )
}

const NomineeLabel = styled.label`
    display: flex;
    align-items: center;
    padding: 10px 0;
`

const NomineeRadio = styled.input`
    font-size: 2rem;
    margin-right: 10px;
`

const NomineeImage = styled.img`
    border-radius: 4px;
`

const NomineeText = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
`

const NomineeTitle = styled.h4`
    font-size: 1.5rem;
    padding: 0;
    margin: 0;
`

const NomineeDescription = styled.h5`
    font-size: 0.8rem;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.7);
    padding: 0.2rem 0;
    margin: 0;
    width: 240px;
`

export default Nominee
