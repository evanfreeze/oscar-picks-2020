import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { OSCARS_START_TIME_EPOCH } from '../constants'

function calculateTimeLeft() {
    const oscarsStart = new Date(OSCARS_START_TIME_EPOCH * 1000).getTime()
    const now = new Date().getTime()
    const difference = oscarsStart - now

    let timeLeft = null

    if (difference > 0) {
        timeLeft = {
            Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            Minutes: Math.floor((difference / (1000 * 60)) % 60),
            Seconds: Math.floor((difference / 1000) % 60),
        }
    }

    return timeLeft
}

function getDisplayTime(timeAmount) {
    if (timeAmount > 0) {
        if (timeAmount >= 10) {
            return timeAmount
        }
        return `0${timeAmount}`
    }
    return '00'
}

function Countdown() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)
    })

    if (!timeLeft) {
        return 'Starting soon!'
    }

    return (
        <CountdownWidget>
            {Object.keys(timeLeft).map(segment => {
                const displayTime = getDisplayTime(timeLeft[segment])
                return (
                    <TimeSegment key={segment}>
                        <h3>{displayTime}</h3>
                        <h4>{segment}</h4>
                    </TimeSegment>
                )
            })}
        </CountdownWidget>
    )
}

const CountdownWidget = styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    padding: 0.25rem 2rem;
`

const TimeSegment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    border: 3px solid #f3f3f5;

    h3 {
        background: #f3f3f5;
        margin: 0;
        width: 100%;
        text-align: center;
        padding: 1.1rem 0;
        border-radius: 6px 6px 0 0;
        font-size: 2.5rem;
        font-family: monospace;
    }

    h4 {
        margin: 0;
        padding: 6px 0;
        font-size: 0.75rem;
        text-transform: uppercase;
        color: rgba(0, 0, 0, 0.4);
    }
`

export default Countdown
