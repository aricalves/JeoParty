import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Nav from './components/Nav.jsx';
import ScoreBoard from './components/ScoreBoard.jsx';
import Clue from './components/Clue.jsx';
import data from '../../sampleData/fakeNews';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      score: 0,
      user: '',
      highScores: data.scoreTable,
      question: data.question[0],
      hasCorrectAnswer: false
    }

    this.getRandomQuestion = this.getRandomQuestion.bind(this);
    this.getUserInfoByName = this.getUserInfoByName.bind(this);
    this.getScoreBoard = this.getScoreBoard.bind(this);
    this.setUser = this.setUser.bind(this);
    this.verifyAnswer = this.verifyAnswer.bind(this);
    this.rejectQuestion = this.rejectQuestion.bind(this);
  }

  componentDidMount() {
    this.getRandomQuestion();
    this.getScoreBoard();
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

  updateUserScore(name, change) {
    axios.post(`/scores/${name}/${change}`)
      .then(() => this.getScoreBoard())
      .then(() => this.getUserInfoByName(name))
      .then(() => this.setState({
        hasCorrectAnswer: true
      }))
      .catch(err => console.log(err))
  }

  setUser(e) {
    this.setState({
      user: e.target.value
    })

    setTimeout(() => this.getUserInfoByName(this.state.user), 1000)
  }

  getUserInfoByName(name) {
    axios.get('/users', { params: { name: name }})
      .then((res) => this.setState({
        score: res.data[0].score
      }))
      .catch(err => {
        if (name === this.state.user) {
          axios.post(`/users/${name}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        }
      })
      .catch(err => {throw err});
  }

  verifyAnswer(attempt) {
    if (attempt === this.state.question.answer) {
      this.updateUserScore(this.state.user, this.state.question.value);
    }
  }

  rejectQuestion() {
    if (!this.state.hasCorrectAnswer) {
      Promise.resolve(this.updateUserScore(this.state.user, -this.state.question.value))
        .then(() => this.getRandomQuestion())
    } else {
      this.getRandomQuestion();
    }
  }

  render () {
    return (
      <div>
        <Nav score={this.state.score} user={this.state.user} onChange={this.setUser}/>
        <ScoreBoard highScores={this.state.highScores}/>
        <Clue question={this.state.question} onSubmit={(e) => this.verifyAnswer(e.target.value)} onClick={this.rejectQuestion} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));