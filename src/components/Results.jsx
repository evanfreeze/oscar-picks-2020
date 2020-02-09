import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { FaAward, FaUserCheck, FaUserTimes } from 'react-icons/fa'

import Section from './Section'
import { AwardWinners } from '../contexts/Winners'
import { UserPicks } from '../contexts/Picks'
import Countdown from './Countdown'
import SubSection from './SubSection'
import { getAwardNameFromId, getNomineeNameFromId } from '../helpers'
import { OSCARS_START_TIME_EPOCH } from '../constants'

const Results = () => {
    const [showCountdown, setShowCountdown] = useState(Date.now() < OSCARS_START_TIME_EPOCH)
    const { winners, awardsPresented, loadingWinners, loadingAwardsPresented } = useContext(
        AwardWinners,
    )
    const { picks, loading: loadingPicks } = useContext(UserPicks)

    useEffect(() => {
        const callback = () => {
            setShowCountdown(Date.now() < OSCARS_START_TIME_EPOCH)
        }

        setInterval(callback, 1000)
        return () => clearInterval(callback)
    }, [])

    if (loadingWinners || loadingAwardsPresented || loadingPicks) {
        return (
            <Section title="Results" id="results">
                <p>Loading...</p>
            </Section>
        )
    }

    function getWinnerNameForAwardId(awardId) {
        const winnerId = winners[awardId]
        const result = winnerId ? getNomineeNameFromId(winnerId) : 'No winner'
        return result
    }

    function getUserPickForAwardId(awardId) {
        const userPickId = picks[awardId]
        const result = userPickId ? getNomineeNameFromId(userPickId) : "You didn't pick this award"
        return result
    }

    return (
        <Section title="Results" id="results">
            {showCountdown && (
                <SubSection title="Countdown to showtime" subtitle="The broadcast begins in...">
                    <Countdown mounted={showCountdown} />
                </SubSection>
            )}
            {!showCountdown && (
                <SubSection
                    title="Presented awards"
                    subtitle="Each award presented on the broadcast along with your pick (most recent on top)"
                >
                    {awardsPresented.length < 2 && (
                        <EmptyMessage>No awards have been presented yet</EmptyMessage>
                    )}
                    {awardsPresented.reverse().map(awardId => {
                        if (awardId === 'start') return null

                        const pickIsCorrect = winners[awardId] === picks[awardId]

                        return (
                            <PresentedAward key={awardId} correct={pickIsCorrect}>
                                <h5>{getAwardNameFromId(awardId)}</h5>
                                <ResultBox>
                                    {pickIsCorrect ? (
                                        <Icon color="rgba(50,190,170,0.4)">
                                            <FaUserCheck />
                                        </Icon>
                                    ) : (
                                        <Icon color="rgba(255, 0, 0, 0.3)">
                                            <FaUserTimes />
                                        </Icon>
                                    )}
                                    <p>{getUserPickForAwardId(awardId)}</p>
                                </ResultBox>
                                <ResultBox>
                                    <Icon color="#A69152">
                                        <FaAward />
                                    </Icon>
                                    <p>{getWinnerNameForAwardId(awardId)}</p>
                                </ResultBox>
                            </PresentedAward>
                        )
                    })}
                </SubSection>
            )}
        </Section>
    )
}

const PresentedAward = styled.section`
    background: ${props => (props.correct ? 'rgba(50,190,170,0.2)' : 'rgba(255, 0, 0, 0.1)')};
    padding: 1rem;
    border-radius: 6px;
    margin: 0.5rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    max-width: 450px;

    & h5 {
        font-size: 1rem;
        grid-column: span 2;
        margin: 0;
        font-family: 'Roboto Slab';
    }

    & h6 {
        margin: 0;
    }
`

const ResultBox = styled.div`
    display: flex;
    align-items: center;
    background: white;
    padding: 0.5rem 1.5rem;
    border-radius: 6px;

    & p {
        margin-left: 0.75rem;
        color: rgba(0, 0, 0, 0.8);
        font-size: 0.8rem;
        font-weight: bold;
    }
`

const Icon = styled.span`
    font-size: 1.2rem;
    color: ${props => props.color || 'inherit'};
`

const EmptyMessage = styled.p`
    background: #f3f3f5;
    text-align: center;
    padding: 1.75rem 1rem;
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.7);
    border-radius: 6px;
`

export default Results
