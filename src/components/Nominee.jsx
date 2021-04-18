import React from 'react'
import styled from 'styled-components'

const Nominee = ({ name, nominee, picked, setPickValue }) => {
    const handlePickChange = (event) => {
        const { target: value } = event
        setPickValue(value.id)
    }

    return (
        <NomineeLabel key={nominee.id} htmlFor={nominee.id} picked={picked}>
            <NomineeRadio
                type="radio"
                id={nominee.id}
                name={name}
                value={nominee.id}
                checked={picked}
                onChange={handlePickChange}
            />
            {nominee.image && <NomineeImage src={nominee.image} height="100px" />}
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
    border-radius: 8px;
    background: ${(props) => (props.picked ? 'rgba(50,190,170,0.3)' : 'initial')};
    border: 2px solid white;

    :hover {
        border: 2px solid rgba(50, 190, 170, 0.3);
    }
`

const NomineeRadio = styled.input`
    visibility: hidden;
    margin-left: -2px;
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
    font-family: 'Roboto Slab';
    padding: 0;
    margin: 0;
`

const NomineeDescription = styled.h5`
    font-weight: normal;
    color: rgba(0, 0, 0, 0.5);
    padding: 0.3rem 0;
    margin: 0;
    font-size: 0.75rem;
`

export default Nominee
