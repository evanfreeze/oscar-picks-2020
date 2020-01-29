import React, { useContext } from 'react'

import { UserPicks } from '../contexts/Picks'
import Section from './Section'
import { getNomineeFromId } from '../helpers'

const Stats = () => {
    const { loading, picks } = useContext(UserPicks)

    const calculateMostPicked = () => {
        const allMetaAndNames = Object.keys(picks).flatMap(pick => {
            const fullPick = getNomineeFromId(picks[pick])
            return [fullPick.name, fullPick.description]
        })
        const dedupeWithCounts = allMetaAndNames.reduce((counts, item) => {
            if (item in counts) {
                counts[item] = counts[item] + 1
            } else {
                counts[item] = 1
            }
            return counts
        }, {})
        const sortedKeys = Object.keys(dedupeWithCounts).sort(
            (key1, key2) => dedupeWithCounts[key2] - dedupeWithCounts[key1],
        )
        const mostPicked = sortedKeys[0]
        const mostPickedCount = dedupeWithCounts[sortedKeys[0]]
        return [mostPicked, mostPickedCount]
    }

    function renderStats() {
        const pickCount = Object.keys(picks).length
        const percentage = ((pickCount / 24) * 100).toFixed(0)

        const [mostPicked, count] = calculateMostPicked()

        return (
            <>
                <p>
                    You&apos;ve picked {pickCount} of 24 awards ({percentage}%)
                </p>
                {pickCount > 0 && (
                    <p>
                        Your most-picked nominee is {mostPicked} with {count} awards
                    </p>
                )}
            </>
        )
    }

    function renderContents() {
        if (loading) {
            return <span>Loading...</span>
        }

        if (!picks) {
            return <span>You haven&apos;t picked any awards yet</span>
        }

        return renderStats()
    }

    return (
        <Section title="Your stats" id="stats">
            {renderContents()}
        </Section>
    )
}

export default Stats
