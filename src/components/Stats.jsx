import React, { useContext } from 'react'
import styled from 'styled-components'

import { UserPicks } from '../contexts/Picks'
import Section from './Section'
import { getNomineeFromId } from '../helpers'
import SubSection from './SubSection'

const Stats = () => {
    const { loading, picks } = useContext(UserPicks)

    const calculateMostPicked = () => {
        const allMetaAndNames = Object.keys(picks).flatMap((pick) => {
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
        const topThree = [
            { name: [sortedKeys[0]], count: dedupeWithCounts[sortedKeys[0]] },
            { name: [sortedKeys[1]], count: dedupeWithCounts[sortedKeys[1]] },
            { name: [sortedKeys[2]], count: dedupeWithCounts[sortedKeys[2]] },
        ]
        return topThree
    }

    function renderStats() {
        const pickCount = Object.keys(picks).length
        const percentage = ((pickCount / 24) * 100).toFixed(0)

        const topThree = calculateMostPicked()

        return (
            <>
                <SubSection
                    title="Progress"
                    subtitle={`You've picked ${pickCount} of 24 awards (${percentage}%)`}
                >
                    <ProgressBg>
                        <ProgressFill percentage={percentage}></ProgressFill>
                    </ProgressBg>
                </SubSection>

                <SubSection
                    title="Most Picked"
                    subtitle="You'll see your most picked nominees here as you make selections"
                >
                    {pickCount >= 3 &&
                        topThree.map((pick) => (
                            <TopThreePick key={pick.name}>
                                <h4>{pick.name}</h4>
                                <h5>
                                    {pick.count} {pick.count > 1 ? 'categories' : 'category'}
                                </h5>
                            </TopThreePick>
                        ))}
                </SubSection>
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
        <Section title="Your Stats" id="stats">
            {renderContents()}
        </Section>
    )
}

const ProgressBg = styled.div`
    background: #f3f3f5;
    width: 100%;
    height: 20px;
    border-radius: 6px;
`

const ProgressFill = styled.div`
    width: ${(props) => props.percentage}%;
    height: 20px;
    border-radius: ${(props) => (props.percentage < 100 ? '6px 0 0 6px' : '6px')};
    background: rgba(50, 190, 170, 1.4);
`

const TopThreePick = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 1rem;
    background: #f3f3f5;
    border-radius: 10px;
    margin: 10px 0;

    h4,
    h5 {
        margin: 0;
    }

    h5 {
        color: rgba(0, 0, 0, 0.6);
        font-weight: normal;
    }
`

export default Stats
