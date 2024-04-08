import React from "react";

export default function StartScreen({ questionsLength, dispatch }) {
    console.log(questionsLength)
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            {/* <h3>{questionsLenght} questions to test your React mastery</h3> */}
            <h3>{questionsLength} questions to test your React mastery</h3>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "start" })}
            >
                let's Start
            </button>
        </div>
    );
}
