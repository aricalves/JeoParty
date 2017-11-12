import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav.jsx';
import ScoreBoard from './components/ScoreBoard.jsx';
import Clue from './components/Clue.jsx';
import axios from 'axios';
import data from '../../sampleData/fakeNews';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      score: 0,
      user: 'aric',
      highScores: data.scoreTable,
      question: data.question[0]
    }

    this.getRandomQuestion = this.getRandomQuestion.bind(this);
    this.getUserInfoByName = this.getUserInfoByName.bind(this);
    this.getScoreBoard = this.getScoreBoard.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    this.getRandomQuestion();
    this.getScoreBoard();
    this.getUserInfoByName(this.state.user);
  }

  getRandomQuestion() {
    return axios.get('http://jservice.io/api/random')
      .then(response => response.data[0])
      .then(question => {
        this.setState({
          question: question
        });
      })
      .catch(err => console.log(err))
  }

  getScoreBoard() {
    axios.get('/scores')
      .then(topScores => this.setState({
        highScores: topScores.data
      }))
      .catch(err => console.log(err));
  }

  setUser(e) {
    console.log(e.target)
    this.setState({
      user: e.target.value
    })
    .then(getUserInfoByName(this.state.user))
  }

  getUserInfoByName(name) {
    axios.get('/users', { params: { name: name }})
      .then((res) => this.setState({
        score: res.data[0].score
      }))
      .catch(err => console.log(err))
  }

  /* TODO: 
    username input/ score updating
    get new question after one has been answered
  */

  render () {
    return (
      <div>
        <Nav score={this.state.score} user={this.state.user} onSubmit={this.findOrCreateUser} onChange={this.setUser}/>
        <ScoreBoard highScores={this.state.highScores}/>
        <Clue question={this.state.question}/>
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));