function Options({ question, dispatch, answer }) {
    const hasAnswered = answer !== null; // Check if the answer is not null
    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    key={option}
                    disabled={hasAnswered} // Disable the buttons if the answer is not null
                    className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered
                        ? index === question.correctOption
                            ? "correct"
                            : "wrong"
                        : ""
                        }`} // Add the 'answer' class to the button if the index matches the answer
                    onClick={() => dispatch({ type: "newAnswer", payload: index })} // Dispatch the newAnswer action with the index as the payload
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default Options;
