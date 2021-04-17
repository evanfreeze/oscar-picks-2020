import React, { useEffect, useState } from 'react'
import firebase from '../firebase'
import { ACTIVE_YEAR } from '../constants'

export const AwardWinners = React.createContext()

const Winners = ({ children }) => {
    const [winners, setWinners] = useState({})
    const [awardsPresented, setAwardsPresented] = useState([])
    const [currentAward, setCurrentAward] = useState('')
    const [loadingWinners, setLoadingWinners] = useState(true)
    const [loadingAwardsPresented, setLoadingAwardsPresented] = useState(true)
    const [loadingCurrentAward, setLoadingCurrentAward] = useState(true)

    useEffect(() => {
        firebase
            .database()
            .ref(`${ACTIVE_YEAR}/results`)
            .on('value', (data) => {
                if (data.val()) {
                    setWinners(data.val())
                }
                setLoadingWinners(false)
            })

        firebase
            .database()
            .ref(`${ACTIVE_YEAR}/live`)
            .on('value', (data) => {
                if (data.val()) {
                    setAwardsPresented(data.val())
                }
                setLoadingAwardsPresented(false)
            })

        firebase
            .database()
            .ref(`${ACTIVE_YEAR}/current`)
            .on('value', (data) => {
                if (data.val()) {
                    setCurrentAward(data.val())
                }
                setLoadingCurrentAward(false)
            })
    }, [])

    function recordWinner(award, winner) {
        const awardPath = `${ACTIVE_YEAR}/results/${award}`
        firebase.database().ref(awardPath).set(winner)

        if (!awardsPresented.includes(award)) {
            firebase
                .database()
                .ref(`${ACTIVE_YEAR}/live`)
                .set([...awardsPresented, award])
        }
    }

    function updateCurrentAward(awardId) {
        firebase.database().ref(`${ACTIVE_YEAR}/current`).set(awardId)
    }

    return (
        <AwardWinners.Provider
            value={{
                winners,
                loadingWinners,
                loadingAwardsPresented,
                awardsPresented,
                recordWinner,
                currentAward,
                loadingCurrentAward,
                updateCurrentAward,
            }}
        >
            {children}
        </AwardWinners.Provider>
    )
}

export default Winners
