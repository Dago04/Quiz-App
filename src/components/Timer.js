import React, { useEffect } from "react";

export default function Timer({ dispatch, secondsRemaining }) {
    const mins = Math.floor(secondsRemaining / 60); // Get the whole number
    const seconds = secondsRemaining % 60; // Get the remainder
    useEffect(
        function () {
            // Timer logic goes here
            const id = setInterval(function () {
                dispatch({ type: "tick" });
            }, 1000);

            return () => clearInterval(id); // Cleanup function
        },
        [dispatch]
    );
    return (
        <div className="timer">
            {mins < 10 && "0"}
            {mins}:{seconds < 10 && "0"}
            {seconds}
        </div>
    );
}
