import React from 'react';
import moment from 'moment';

const Clue = (props) => (
  <div>
    <h4>Category: {props.question.category.title}</h4>
    <h4>Answer: {props.question.question}</h4>
    <span>What is a</span>
    <input></input>
    <button>Go!</button>
    <p>Aired: {moment(props.question.airdate).format("MMM Do, YYYY")}</p>
    <img src="" alt="Suck it, Trebek"/>
  </div>
)

export default Clue;