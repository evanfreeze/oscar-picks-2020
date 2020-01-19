import React from 'React'
import styled from 'styled-components'

import Nominee from './Nominee'

const Award = ({ award, currentPick, setNewPick }) => {
    const setPickValue = nomineeId => {
        setNewPick(award.id, nomineeId)
    }

    return (
        <StyledAward>
            <h3>{award.title}</h3>
            {award.nominees.map(nominee => {
                return (
                    <Nominee
                        key={nominee.id}
                        name={award.id}
                        nominee={nominee}
                        picked={currentPick === nominee.id}
                        setPickValue={setPickValue}
                    />
                )
            })}
        </StyledAward>
    )
}

const StyledAward = styled.section`
    border: 1px solid rgba(0, 0, 0, 0.4);
    padding: 0px 14px 20px;
    border-radius: 6px;
    margin: 20px 0;
`

export default Award
