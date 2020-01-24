import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import { auth } from './firebase'

import Picks from './contexts/Picks'
import AwardList from './components/AwardList'
import UserInfo from './components/UserInfo'
import Stats from './components/Stats'
import Results from './components/Results'

const App = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user)
            }
        })
    }, [])

    return (
        <StyledApp>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    background: 'white',
                }}
            >
                <AppHeader>
                    <h1>Oscar Picks 2020</h1>
                    <UserInfo user={user} setUser={setUser} />
                </AppHeader>
            </div>
            <AppNav>
                <a href="#your-picks">Your picks</a>
                <a href="#stats">Stats</a>
                <a href="#results">Results</a>
            </AppNav>
            {!user && (
                <EmptyState>Click &ldquo;Sign in&rdquo; at the top to get started</EmptyState>
            )}
            <AppContent>
                {user && (
                    <Picks userId={user.uid}>
                        <AwardList />
                        <Stats />
                        <Results />
                    </Picks>
                )}
            </AppContent>
        </StyledApp>
    )
}

const StyledApp = styled.div`
    font-family: sans-serif;
`

const AppContent = styled.section`
    display: grid;
    justify-content: center;
    grid-template-columns: 500px 500px 500px;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`

const AppHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 20px;
    width: 1430px;

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    & h1 {
        margin: 0;
    }
`

const AppNav = styled.nav`
    display: none;

    @media (max-width: 640px) {
        & > * {
            display: block;
            color: white;
            margin: 4px 0;
            text-decoration: none;
            font-weight: bold;
            text-transform: uppercase;
        }

        display: flex;
        justify-content: space-around;
        width: 100%;
        padding: 16px 0;
        background: #222;
        position: sticky;
        top: 0px;
    }
`

const EmptyState = styled.h2`
    text-align: center;
    margin-top: 100px;
    color: rgba(0, 0, 0, 0.5);
    font-size: 1rem;
`

render(<App />, document.getElementById('root'))
