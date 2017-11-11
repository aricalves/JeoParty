import React from 'react';

const Nav = (props) => (
  <div>
    <span id="score">Your Score: {props.user.score}</span>
    <h4 id="logo">JeoParty!</h4>
    <span id="username"> {props.user.name}</span>
  </div>
)

export default Nav;