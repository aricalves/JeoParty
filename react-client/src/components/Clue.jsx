import React from 'react';
import moment from 'moment';

const Clue = (props) => (
  <div>
    <h4>Category: {props.question.category.title}</h4>
    <h4>Answer: {props.question.question}</h4>
    What is a 
    <input type="text" onChange={props.onSubmit} />
    <button onClick={props.onClick}>New Clue</button>
    <h4>Value: {props.question.value}</h4>
    <p>Aired: {moment(props.question.airdate).format("MMM Do, YYYY")}</p>
    <img src='trebek.png' height='400' width='400' alt='Suck it, Trebek'/>
  </div>
)

export default Clue;