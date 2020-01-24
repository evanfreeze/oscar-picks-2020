import React from 'react'
import { formatDistanceToNow, fromUnixTime } from 'date-fns'

import { OSCARS_START_TIME_EPOCH } from '../constants'
import Section from './Section'

const timeUntilOscars = formatDistanceToNow(fromUnixTime(OSCARS_START_TIME_EPOCH), {
    addSuffix: true,
})

const Results = () => {
    return (
        <Section title="Results" id="results">
            <p>The Oscars are {timeUntilOscars}</p>
            <p>No categories have been awarded</p>
        </Section>
    )
}

export default Results