import { useState } from "react";
import { Statistics } from "./components/Statistics";
import { Header } from "./components/Header";
import { Content } from "./components/Content";

const App = () => {
  const [good,setGood]=useState(0);
  const [neutral,setNeutral]=useState(0);
  const [bad,setBad]=useState(0);

   return (
    <>
    <Header/>
    <button onClick={() => setGood(good + 1)}>good</button>
    <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
    <button onClick={() => setBad(bad + 1)}>bad</button>
    <Content/>
    <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App