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
      user: {
        name: 'Aric',
        score: 400
      },
      highScores: data.scoreTable,
      question: data.question[0]
    }

    this.getRandomQuestion = this.getRandomQuestion.bind(this);
    this.getUserInfoByName = this.getUserInfoByName.bind(this);
  }

  componentDidMount() {
    this.getRandomQuestion();
    this.getUserInfoByName('andy');
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

  getUserInfoByName(name) {
   console.log('calling server')
    axios.get('/users', {
      params: {
        name: name
      }
    })
      .then(res => console.log(res))
      .catch(er => console.log(err))
  }

  /* TODO: 
    username input/ score updating
    get new question after one has been answered
  */

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