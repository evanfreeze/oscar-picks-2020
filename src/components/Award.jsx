import React, { useState } from 'react'
import styled from 'styled-components'
import { IoIosArrowDropright, IoIosArrowDropdown } from 'react-icons/io'

import Nominee from './Nominee'
import { getNomineeNameFromId } from '../helpers'

const Award = ({ award, currentPick, setNewPick }) => {
    const [collapsed, setCollapsed] = useState(Boolean(currentPick))

    const setPickValue = nomineeId => {
        setNewPick(award.id, nomineeId)
        setTimeout(() => {
            setCollapsed(true)
        }, 1000)
    }

    return (
        <StyledAward>
            <AwardHeader onClick={() => setCollapsed(!collapsed)}>
                <div>
                    <AwardTitle>{award.title}</AwardTitle>
                    {currentPick ? (
                        <AwardYouPicked>
                            You picked{' '}
                            <NomineeName>{getNomineeNameFromId(currentPick)}</NomineeName>
                        </AwardYouPicked>
                    ) : (
                        <AwardYouPicked>
                            You <ErrorText>haven&apos;t picked</ErrorText> this category yet
                        </AwardYouPicked>
                    )}
                </div>
                <ExpandCollapseButton>
                    {collapsed ? <IoIosArrowDropright /> : <IoIosArrowDropdown />}
                </ExpandCollapseButton>
            </AwardHeader>

            {!collapsed && (
                <StyledAwardList>
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
                </StyledAwardList>
            )}
        </StyledAward>
    )
}

const StyledAward = styled.section`
    padding: 14px 0 28px;
    border-bottom: 2px solid #ddd;
    margin: 20px;
    background: white;
    max-width: 450px;
`

const AwardHeader = styled.header`
    padding: 14px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
`

const AwardTitle = styled.h3`
    // font-size: 2.2rem;
    margin: 0;
    padding: 0;
`

const AwardYouPicked = styled.p`
    margin: 0.8rem 0 0;
    color: rgba(0, 0, 0, 0.5);
`

const ExpandCollapseButton = styled.button`
    font-size: 1.5rem;
    background: none;
    border: 0;
    outline: none;
    margin: 10px;
`

const StyledAwardList = styled.section`
    margin: 10px 0;
`

const NomineeName = styled.span`
    color: rgba(50, 190, 170, 0.7);
    font-weight: bold;
`

const ErrorText = styled.span`
    color: red;
    font-weight: bold;
`

export default Award
