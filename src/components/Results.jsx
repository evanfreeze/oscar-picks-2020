import React, { useContext } from 'react'

import Section from './Section'
import { AwardWinners } from '../contexts/Winners'
import Countdown from './Countdown'
import SubSection from './SubSection'

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
            <SubSection title="Countdown to showtime" subtitle="The Oscars broadcast begins in...">
                <Countdown />
            </SubSection>
        </Section>
    )
}

export default Results
