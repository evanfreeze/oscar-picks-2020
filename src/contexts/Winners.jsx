import React, { useEffect, useState } from 'react'
import firebase from '../firebase'

export const AwardWinners = React.createContext()

const Winners = ({ children }) => {
    const [winners, setWinners] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        firebase
            .database()
            .ref('2020/results')
            .on('value', data => {
                if (data.val()) {
                    setWinners(data.val())
                }
                setLoading(false)
            })
    }, [])

    function recordWinner(award, winner) {
        const awardPath = `2020/results/${award}`
        firebase
            .database()
            .ref(awardPath)
            .set(winner)
    }

    return (
        <AwardWinners.Provider value={{ winners, loading, recordWinner }}>
            {children}
        </AwardWinners.Provider>
    )
}

export default Winners
