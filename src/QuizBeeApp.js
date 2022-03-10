import questions from './questions.js';
import React, { Component } from 'react';
import './style.css';
import QuestionBox from './component/QuestionBox';
import Result from './component/Result';

/* when we click a button -> we pass our option if it is correct, if correct we increment score by 1*/
class QuizBeeApp extends Component {
  //declare state in our component
  state = {
    questionBank: [],
    score: 0,
    responses: 0,
  };
  //this invokes the questionBank and gets results
  getQuestions = () => {
    questions().then((question) => {
      this.setState({
        questionBank: question,
      });
    });
  };
  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1,
      });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5,
    });
  };
  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0,
    });
  };
  //load for first time
  componentDidMount() {
    this.getQuestions();
  }
  render() {
    return (
      <div className='container'>
        <div className='title'>🐝 Quiz-Bee 🐝</div>
        {this.state.questionBank.length > 0 &&
          this.state.responses <= 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                question={question}
                options={answers}
                key={questionId}
                selected={(answer) => this.computeAnswer(answer, correct)}
              />
            )
          )}
        {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain} />) : null}
      </div>
    );
  }
}
export default QuizBeeApp;
//<Result score={this.state.score} playAgain={this.playAgain} />
