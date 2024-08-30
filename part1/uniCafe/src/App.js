import { useState } from "react";

import { Statistics } from "./components/Statistics";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Button } from "./components/Button";

const App = () => {
  
  const [good,setGood]=useState(0);
  const [neutral,setNeutral]=useState(0);
  const [bad,setBad]=useState(0);

  const goodClickHandler = () => {
    return setGood(good + 1);
  }
  const neutralClickHandler = () => {
    return setNeutral(neutral + 1);
  }
  const badClickHandler = () => {
    return setBad(bad + 1);
  }
   return (
    <>
    <Header/>
    <Button handleClick={goodClickHandler} text="good"/>
    <Button handleClick={neutralClickHandler} text="neutral"/>
    <Button handleClick={badClickHandler} text="bad"/>
    <Content/>
    <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App