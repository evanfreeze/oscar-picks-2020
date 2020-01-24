import React, { useState, useEffect } from 'react'

import firebase from '../firebase'
import { FIREBASE_PATH } from '../constants'

export const UserPicks = React.createContext()

export function Picks({ userId, children }) {
    const userPath = `${FIREBASE_PATH}/${userId}`
    const [loading, setLoading] = useState(true)
    const [picks, setPicks] = useState({})

    const setNewPick = (awardId, nomineeId) => {
        const awardPath = `${userPath}/${awardId}`
        firebase
            .database()
            .ref(awardPath)
            .set(nomineeId)
    }

    useEffect(() => {
        firebase
            .database()
            .ref(userPath)
            .on('value', data => {
                if (data.val()) {
                    setPicks(data.val())
                }
                setLoading(false)
            })
    }, [])

    return (
        <UserPicks.Provider value={{ loading, picks, setNewPick }}>{children}</UserPicks.Provider>
    )
}

export default Picks
