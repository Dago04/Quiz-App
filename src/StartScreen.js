import React from 'react'

export default function StartScreen({ questionsLenght }) {
    return (
        <div className='start'>
            <h2>Welcome to the React Quiz!</h2>
            <h3>{questionsLenght} questions to test your React mastery</h3>
            <button className='btn btn-ui'>let's Start</button>
        </div>
    )
}
