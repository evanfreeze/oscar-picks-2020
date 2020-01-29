import React, { useState, useEffect } from 'react'
import { auth, provider } from '../firebase'
import styled from 'styled-components'

const ADMIN = 'SzRiZpNrGFPHceoV952M0wBIq6l2'
export const User = React.createContext()

const UserInfo = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user)
                if (user.uid === ADMIN) {
                    setIsAdmin(true)
                }
            }
        })
    }, [])

    const signIn = () => {
        auth.signInWithPopup(provider).then(({ user }) => setUser(user))
    }

    const signOut = () => {
        auth.signOut().then(() => setUser(null))
    }

    function renderUserInfoWidget() {
        if (!user) {
            return (
                <StyledSpan>
                    <span>
                        You&apos;re not signed in (
                        <SignInOutButton onClick={signIn}>Sign in</SignInOutButton>)
                    </span>
                </StyledSpan>
            )
        }

        return (
            <StyledSpan>
                Signed in as {user.displayName} (
                <SignInOutButton onClick={signOut}>Sign out</SignInOutButton>)
            </StyledSpan>
        )
    }

    return <User.Provider value={{ renderUserInfoWidget, user, isAdmin }}>{children}</User.Provider>
}

const StyledSpan = styled.span`
    margin: 10px 0;
`

const SignInOutButton = styled.button`
    border: none;
    background: none;
    text-decoration: underline;
    color: blue;
    font-size: 1rem;
    margin: 0;
    padding: 0;
`

export default UserInfo
