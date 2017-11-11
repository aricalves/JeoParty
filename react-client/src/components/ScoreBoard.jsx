import React from 'react';
import ScoreBoardEntry from './ScoreBoardEntry.jsx';

const ScoreBoard = (props) => (
  <div>
    <h4>ScoreBoard</h4>
    {props.highScores.map((entry, i) => <ScoreBoardEntry entry={entry} key={i}/>)}
  </div>
)

export default ScoreBoard;