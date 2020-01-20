import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import { auth, provider } from './firebase'

import AwardList from './components/AwardList'

const App = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user)
            }
        })
    }, [])

    const logIn = () => {
        auth.signInWithPopup(provider).then(({ user }) => setUser(user))
    }

    const logOut = () => {
        auth.signOut().then(({ user }) => setUser(user))
    }

    return (
        <StyledApp>
            <h1>Oscar Picks 2020</h1>
            {user ? (
                <span>
                    Signed in as {user.displayName} (<button onClick={logOut}>Sign out</button>)
                </span>
            ) : (
                <>
                    <span>You're not signed in</span>
                    <button onClick={logIn}>Sign in</button>
                </>
            )}
            {user && <AwardList userId={user.uid} />}
        </StyledApp>
    )
}

const StyledApp = styled.div`
    font-family: sans-serif;
`

render(<App />, document.getElementById('root'))
