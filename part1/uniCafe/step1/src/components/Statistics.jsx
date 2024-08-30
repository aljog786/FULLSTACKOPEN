
export const Statistics = ({good,neutral,bad}) => {
  return (
    <div>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {good + neutral + bad}</p>
    <p>average {(good - bad)/(good + neutral + bad)}</p>
    <p>positive {(good * 100)/(good + neutral + bad)} %</p>
    </div>
  )
}
