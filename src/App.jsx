import React from 'react'
import { render } from 'react-dom'

import AwardList from './components/AwardList'

const App = () => (
    <div>
        <h1>Oscar Picks 2020</h1>
        <AwardList />
    </div>
)

render(<App />, document.getElementById('root'))
