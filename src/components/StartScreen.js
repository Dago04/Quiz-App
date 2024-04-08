import React from "react";

export default function StartScreen({ questionsLenght, dispatch }) {
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            {/* <h3>{questionsLenght} questions to test your React mastery</h3> */}
            <h3>15 questions to test your React mastery</h3>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "start" })}
            >
                let's Start
            </button>
        </div>
    );
}
