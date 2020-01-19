import React, { useState, useEffect } from 'react'
import Award from './Award'

import * as awardsData from '../awards-data.json'

const AwardList = () => {
    const savedPicks = localStorage.getItem('oscar-picks-2020')
        ? JSON.parse(localStorage.getItem('oscar-picks-2020'))
        : {}
    const [picks, setPicks] = useState(savedPicks)

    useEffect(() => {
        localStorage.setItem('oscar-picks-2020', JSON.stringify(picks))
        console.log(picks)
    }, [picks])

    const setNewPick = (awardId, nomineeId) => {
        setPicks({
            ...picks,
            [awardId]: nomineeId,
        })
    }

    return (
        <main>
            <h2>Awards & Nominees</h2>
            <article>
                {awardsData.awards.map(award => (
                    <Award
                        key={award.title}
                        award={award}
                        setNewPick={setNewPick}
                        currentPick={picks[award.id]}
                    />
                ))}
            </article>
        </main>
    )
}

export default AwardList
