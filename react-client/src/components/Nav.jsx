import React from 'react';

const Nav = (props) => (
  <div>
    <span id="score">Your Score: {props.score}</span>
    <h4 id="logo">JeoParty!</h4>
    <form onSubmit={props.onSubmit}>
      <label>
        Name:
        <input type="text" onChange={props.onChange} />
      </label>
    </form>
  </div>
)

export default Nav;