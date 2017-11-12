import React from 'react';

const Nav = (props) => (
  <div>
    <span id="score">Your Score: {props.score}</span>
    <h4 id="logo">JeoParty!</h4>
    <form onSubmit={props.findOrCreateUser}>
      <label>
        Name:
        <input type="text" value={props.user} onChange={props.setUser} />
      </label>
    </form>
  </div>
)

export default Nav;