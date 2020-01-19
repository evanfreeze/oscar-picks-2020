import React from 'react'
import Award from './Award'

import * as awardsData from '../awards-data.json'

const renderMappedAwards = () => {
    return awardsData.awards.map(award => {
        return <Award key={award.title} award={award} />
    })
}

const AwardList = () => (
    <main>
        <h2>Awards & Nominees</h2>
        <article>{renderMappedAwards()}</article>
    </main>
)

export default AwardList
