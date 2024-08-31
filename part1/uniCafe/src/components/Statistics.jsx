import { StatisticLine } from "./StatisticLine"

export const Statistics = ({good,neutral,bad}) => {
  if(!(good || neutral || bad)){
    return (
      <p>no feedback</p>
    )
  }
  return (
    <table>
    <StatisticLine text='good' value={good}/>
    <StatisticLine text='neutral' value={neutral}/>
    <StatisticLine text='bad' value={bad}/>
    <StatisticLine text='all' value={good + neutral + bad}/>
    <StatisticLine text='average' value={(good - bad)/(good + neutral + bad)}/>
    <StatisticLine text='positive' value={(good * 100)/(good + neutral + bad)+' %'}/>
    </table>
  )
}
