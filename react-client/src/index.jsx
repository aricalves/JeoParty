import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav.jsx';
import ScoreBoard from './components/ScoreBoard.jsx';
import ScoreBoardEntry from './components/ScoreBoardEntry.jsx';
import Clue from './components/Clue.jsx';
import $ from 'jquery';
import data from '../../sampleData/fakeNews';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: {
        name: 'Aric',
        score: 400
      },
      highScores: data.scoreTable,
      question: data.question[0]
    }
  }

  componentDidMount() {
  }

  render () {
    return (
      <div>
        <Nav user={this.state.user}/>
        <ScoreBoard highScores={this.state.highScores}/>
        <Clue question={this.state.question}/>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));