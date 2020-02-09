import React, { useContext } from 'react'
import { Router } from '@reach/router'
import { render } from 'react-dom'
import styled from 'styled-components'

import Picks from './contexts/Picks'
import Winners from './contexts/Winners'
import AwardList from './components/AwardList'
import UserInfo, { User } from './contexts/UserInfo'
import Stats from './components/Stats'
import Results from './components/Results'
import Live from './components/Live'

const App = () => {
    const { user, renderUserInfoWidget } = useContext(User)

    return (
        <StyledApp>
            <HeaderContainer>
                <AppHeader>
                    <h1>Oscar Picks 2020</h1>
                    {renderUserInfoWidget()}
                </AppHeader>
            </HeaderContainer>
            <AppNav>
                <a href="#your-picks">Your picks</a>
                <a href="#results">Results</a>
                <a href="#stats">Stats</a>
            </AppNav>
            {!user && (
                <EmptyState>Click &ldquo;Sign in&rdquo; at the top to get started</EmptyState>
            )}
            <AppContent>
                {user && (
                    <Picks userId={user.uid}>
                        <AwardList />
                        <aside>
                            <Results />
                            <Stats />
                        </aside>
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
    display: flex;
    justify-content: center;

    @media (max-width: 640px) {
        flex-direction: column;
    }
`

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background: white;
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
        font-family: 'Roboto Slab';
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

render(
    <UserInfo>
        <Winners>
            <Picks>
                <Router>
                    <App path="/" />
                    <Live path="/live" />
                </Router>
            </Picks>
        </Winners>
    </UserInfo>,
    document.getElementById('root'),
)
