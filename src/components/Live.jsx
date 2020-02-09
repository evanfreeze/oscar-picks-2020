import React, { useContext } from 'react'
import styled from 'styled-components'

import { AwardWinners } from '../contexts/Winners'
import { UserPicks } from '../contexts/Picks'
import { FaSpinner } from 'react-icons/fa'
import { getAwardNameFromId, getNomineeNameFromId, getNomineeFromId } from '../helpers'

const FAM_IDS = [
    {
        id: 'C1wnZyulvGYNCsizRK6mes2Zksp2',
        name: 'Susan',
    },
    {
        id: 'ndSuPi6ZQ4hJOjNFuSuqnI3qUnq2',
        name: 'Greg',
    },
    {
        id: 'htTC0XlImKQzmgAOQg6eOC2Yoor1',
        name: 'Jasmin',
    },
    {
        id: 'SzRiZpNrGFPHceoV952M0wBIq6l2',
        name: 'Evan',
    },
]

const Live = () => {
    const {
        winners,
        loadingWinners,
        currentAward,
        loadingCurrentAward,
        awardsPresented,
    } = useContext(AwardWinners)
    const { everyonesPicks, loadingEveryonesPicks } = useContext(UserPicks)

    if (loadingWinners || loadingCurrentAward || loadingEveryonesPicks) {
        return (
            <LiveApp>
                <LiveContent>
                    <FaSpinner />
                </LiveContent>
            </LiveApp>
        )
    }

    function getUsersPickForAward(userId, awardId) {
        const pickId = everyonesPicks[userId][awardId]
        const pick = getNomineeFromId(pickId) || null
        return pick ? pick : { name: 'No pick' }
    }

    function buildLeaderboard() {
        const leaders = FAM_IDS.reduce((acc, person) => {
            const userCorrectCount = getUsersCorrectPicksCount(person.id)
            const percentage =
                awardsPresented.length > 1
                    ? Math.round((userCorrectCount / (awardsPresented.length - 1)) * 100)
                    : 0
            return acc.concat({ name: person.name, total: userCorrectCount, percentage })
        }, [])
        return leaders.sort((a, b) => b.total - a.total)
    }

    function getUsersCorrectPicksCount(userId) {
        const userPicks = everyonesPicks[userId]
        const awardIds = Object.keys(winners)
        const correct = awardIds.filter(awardId => winners[awardId] === userPicks[awardId])
        return correct.length
    }

    const currentWinner = winners[currentAward] === 'TBA' ? '' : winners[currentAward]
    const currentWinnerName = getNomineeNameFromId(currentWinner)

    return (
        <LiveApp>
            <LiveContent>
                <CurrentAwardTitle>{getAwardNameFromId(currentAward)}</CurrentAwardTitle>
                <CurrentAwardWinner>
                    <h3>{currentWinnerName}</h3>
                </CurrentAwardWinner>
                <BottomSection>
                    <HorizontalSection>
                        <h2>Our picks</h2>
                        {FAM_IDS.map(person => {
                            const usersPick = getUsersPickForAward(person.id, currentAward)

                            return (
                                <Pick key={person.id}>
                                    <h4>{person.name}</h4>
                                    <div>
                                        <h5>{usersPick.name}</h5>
                                        <img src={usersPick.image} />
                                    </div>
                                </Pick>
                            )
                        })}
                    </HorizontalSection>
                    <HorizontalSection>
                        <h2>Leaderboard</h2>
                        {buildLeaderboard().map((person, index) => (
                            <LeaderboardRow key={person.id}>
                                <h4>{index + 1}</h4>
                                <div>
                                    <h4>{person.name}</h4>
                                    <h5>
                                        {person.total} / {awardsPresented.length - 1} (
                                        {person.percentage}
                                        %)
                                    </h5>
                                </div>
                            </LeaderboardRow>
                        ))}
                    </HorizontalSection>
                </BottomSection>
            </LiveContent>
        </LiveApp>
    )
}

const LiveApp = styled.main`
    width: 1920px;
    height: 1080px;
    max-height: 1080px;
    background: black;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(http://www.pixelstalk.net/wp-content/uploads/2016/04/Art-deco-gold-wallpaper-2560x1440.jpg);
    background-repeat: no-repeat;
    background-size: cover;
`

const LiveContent = styled.section`
    border: 2px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 40px;
    bottom: 40px;
    left: 45px;
    right: 45px;
    padding: 30px 60px;
`

const CurrentAwardTitle = styled.h1`
    font-size: 80px;
    margin: 0;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    padding: 14px 0;
    border-radius: 20px 20px 0 0;
    text-align: center;
`

const CurrentAwardWinner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 20px 20px;
    background: rgba(255, 255, 255, 0.9);

    & h3 {
        font-size: 90px;
        font-family: sans-serif;
        color: black;
    }
`

const BottomSection = styled.section`
    display: grid;
    grid-gap: 60px;
    grid-template-columns: 2fr 1fr;
    width: 100%;
    height: 50%;
    padding: 60px;
`

const HorizontalSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & h2 {
        font-size: 50px;
        margin: 0;
        border-bottom: 4px solid rgba(255, 255, 255, 1);
        padding-bottom: 10px;
        margin-bottom: 10px;
    }
`

const Pick = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    font-family: sans-serif;
    margin: 6px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;

    & div {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: white;
        padding-left: 40px;
        width: 100%;

        & img {
            margin: 0;
            padding: 0;
            height: 98px;
            border-radius: 0 16px 16px 0;
        }
    }

    & h4 {
        font-size: 40px;
        margin: 0;
        background: rgba(255, 255, 255, 0.85);
        color: black;
        width: 18%;
        padding: 26px 40px;
        border-radius: 16px;
    }

    & h5 {
        font-size: 40px;
        margin: 0;
        margin-right: 20px;
    }
`

const LeaderboardRow = styled.div`
    display: flex;
    align-items: center;
    color: white;
    width: 95%;
    background: rgba(0, 0, 0, 0.5);
    padding-left: 20px;
    border-radius: 14px;
    font-family: sans-serif;
    margin: 6px;

    & div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(255, 255, 255, 0.85);
        color: black;
        border-radius: 14px;
        width: 100%;
        padding: 20px 20px;

        & h4 {
            font-size: 40px;
            margin: 0;
        }
    }

    & h4 {
        font-size: 40px;
        margin: 0;
        padding-right: 20px;
    }

    & h5 {
        font-size: 32px;
        margin: 0;
        color: rgba(0, 0, 0, 0.75);
    }
`

export default Live
