import React, { useState, useEffect } from 'react'
import Award from './Award'
import firebase from '../firebase'
import styled from 'styled-components'

import { FIREBASE_PATH } from '../constants'
import * as awardsData from '../awards-data.json'

const AwardList = ({ userId }) => {
    const userPath = `${FIREBASE_PATH}/${userId}`
    const [loading, setLoading] = useState(true)
    const [picks, setPicks] = useState({})

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

    const setNewPick = (awardId, nomineeId) => {
        const awardPath = `${userPath}/${awardId}`
        firebase
            .database()
            .ref(awardPath)
            .set(nomineeId)
    }

    return (
        <AwardsAndNominees>
            <h2>Awards & Nominees</h2>
            <article>
                {loading && <p>Loading picks...</p>}
                {!loading &&
                    awardsData.awards.map(award => (
                        <Award
                            key={award.title}
                            award={award}
                            setNewPick={setNewPick}
                            currentPick={picks[award.id] || null}
                        />
                    ))}
            </article>
        </AwardsAndNominees>
    )
}

const AwardsAndNominees = styled.main`
    color: black;
`

export default AwardList
