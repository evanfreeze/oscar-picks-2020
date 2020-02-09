import React, { useEffect, useState } from 'react'
import firebase from '../firebase'

export const AwardWinners = React.createContext()

const Winners = ({ children }) => {
    const [winners, setWinners] = useState({})
    const [awardsPresented, setAwardsPresented] = useState([])
    const [loadingWinners, setLoadingWinners] = useState(true)
    const [loadingAwardsPresented, setLoadingAwardsPresented] = useState(true)

    useEffect(() => {
        firebase
            .database()
            .ref('2020/results')
            .on('value', data => {
                if (data.val()) {
                    setWinners(data.val())
                }
                setLoadingWinners(false)
            })

        firebase
            .database()
            .ref('2020/live')
            .on('value', data => {
                if (data.val()) {
                    setAwardsPresented(data.val())
                }
                setLoadingAwardsPresented(false)
            })
    }, [])

    function recordWinner(award, winner) {
        const awardPath = `2020/results/${award}`
        firebase
            .database()
            .ref(awardPath)
            .set(winner)

        if (!awardsPresented.includes(award)) {
            firebase
                .database()
                .ref('2020/live')
                .set([...awardsPresented, award])
        }
    }

    return (
        <AwardWinners.Provider
            value={{
                winners,
                loadingWinners,
                loadingAwardsPresented,
                awardsPresented,
                recordWinner,
            }}
        >
            {children}
        </AwardWinners.Provider>
    )
}

export default Winners
