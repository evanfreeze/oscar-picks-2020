import React, { useContext } from 'react'

import { UserPicks } from '../contexts/Picks'
import Award from './Award'
import Section from './Section'

import * as awardsData from '../2021-awards-data.json'

const AwardList = () => {
    const { loading, picks, setNewPick } = useContext(UserPicks)

    return (
        <Section title="Your picks" id="your-picks">
            {awardsData.awards.map((award) => (
                <Award
                    key={award.title}
                    award={award}
                    setNewPick={setNewPick}
                    currentPick={picks[award.id] || null}
                />
            ))}
        </Section>
    )
}

export default AwardList
