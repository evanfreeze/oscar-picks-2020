import React, { useContext } from 'react'
import { formatDistanceToNow, fromUnixTime } from 'date-fns'

import { OSCARS_START_TIME_EPOCH } from '../constants'
import Section from './Section'
import { AwardWinners } from '../contexts/Winners'

const timeUntilOscars = formatDistanceToNow(fromUnixTime(OSCARS_START_TIME_EPOCH), {
    addSuffix: true,
})

const Results = () => {
    const { winners, loading } = useContext(AwardWinners)

    if (loading) {
        return (
            <Section title="Results" id="results">
                <p>Loading...</p>
            </Section>
        )
    }

    return (
        <Section title="Results" id="results">
            <p>The Oscars are {timeUntilOscars}</p>
            <p>No categories have been awarded</p>
        </Section>
    )
}

export default Results
