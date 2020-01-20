import React from 'react'
import { auth, provider } from '../firebase'
import styled from 'styled-components'

const UserInfo = ({ user, setUser }) => {
    const signIn = () => {
        auth.signInWithPopup(provider).then(({ user }) => setUser(user))
    }

    const signOut = () => {
        auth.signOut().then(() => setUser(null))
    }

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
