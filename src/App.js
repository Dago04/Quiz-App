import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loading from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],
  // 'loading', 'error, 'ready', 'active', 'finished'
  status: "loading",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    default:
      throw new Error("invalid action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status } = state;
  const questionsLenght = questions.length;
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loading />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen questionsLenght={questionsLenght} />}
      </Main>
    </div>
  );
}
