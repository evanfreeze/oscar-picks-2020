import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { IoIosArrowDropright, IoIosArrowDropdown } from 'react-icons/io'

import { AwardWinners } from '../contexts/Winners'
import { User } from '../contexts/UserInfo'
import Nominee from './Nominee'
import { getNomineeNameFromId } from '../helpers'

const Award = ({ award, currentPick, setNewPick }) => {
    const [collapsed, setCollapsed] = useState(Boolean(currentPick))
    const { recordWinner, winners } = useContext(AwardWinners)
    const { isAdmin } = useContext(User)

    const setPickValue = nomineeId => {
        setNewPick(award.id, nomineeId)
        setTimeout(() => {
            setCollapsed(true)
        }, 1000)
    }

    function adminSetWinner(event) {
        const {
            target: { value, name },
        } = event
        recordWinner(name, value)
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

            {isAdmin && (
                <WinnerSelect
                    name={award.id}
                    onBlur={adminSetWinner}
                    defaultValue={winners[award.id]}
                >
                    <option value="TBA">Choose {award.title} winner...</option>
                    {award.nominees.map(nominee => (
                        <option key={nominee.id} value={nominee.id}>
                            {nominee.name}
                        </option>
                    ))}
                </WinnerSelect>
            )}

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
    padding: 0 0 12px;
    border-bottom: 2px solid #ddd;
    margin: 10px 0;
    background: white;
    max-width: 600px;
`

const AwardHeader = styled.header`
    padding: 14px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
`

const AwardTitle = styled.h3`
    margin: 0;
    padding: 0;
    font-family: 'Roboto Slab';
`

const AwardYouPicked = styled.p`
    margin: 0.4rem 0 0;
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
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
    color: rgba(50, 190, 170, 1);
    font-weight: bold;
`

const ErrorText = styled.span`
    color: red;
    font-weight: bold;
`

const WinnerSelect = styled.select`
    padding: 10px;
    width: 100%;
`

export default Award
