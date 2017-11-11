import React from 'react';

const ScoreBoardEntry = (props) => (
  <div>
    {props.entry.name}: {props.entry.score}
  </div>
)

export default ScoreBoardEntry;