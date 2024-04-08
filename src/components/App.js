import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loading from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import questionsData from "../data/questions.json"; // Importar los datos

const SECS_PER_QUESTION = 30; // Número de segundos por pregunta
const initialState = {
  questions: [],
  // 'loading', 'error, 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
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
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index]; // Obtener la pregunta actual
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Acción inválida");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState); // Utilizar el reducer
  const { questions, status, index, answer, points, highscore, secondsRemaining } = state; // Desestructurar el estado

  const questionsLength = questions.length; // Obtener la cantidad de preguntas
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0); // Calcular los puntos máximos
  console.log(questionsLength)

  useEffect(() => {
    dispatch({ type: "dataReceived", payload: questionsData.questions }); // Simular la recepción de los datos
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loading />}

        {status === "ready" && (
          <StartScreen questionsLength={questionsLength} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={questionsLength}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={questionsLength} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}