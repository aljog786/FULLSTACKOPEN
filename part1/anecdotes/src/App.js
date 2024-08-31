import { useState } from 'react'

const App = () => {
  
  const [selected, setSelected] = useState(0);
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  // Initialize the votes state as an array of zeros
  const initialVotes = new Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(initialVotes);

  const randomString = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }

  const handleVote = () => {
    const newVotes = [...votes];
    console.log(newVotes);
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const maxVoteIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} vote(s)</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={randomString}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      { votes[maxVoteIndex] === 0 ?
      (<p>no votes yet</p>)
      :
      (<><p>{anecdotes[maxVoteIndex]}</p><p>has {votes[maxVoteIndex]} vote(s)</p></>)}
      {/* video completed : 17/58 */}
    </div>
  );
}

export default App;
