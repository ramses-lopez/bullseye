import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      hitCount: 0,
      errorCount: 0,
      targetPosition: {x:'50%', y:'50%'},
      showMessageBox: false
    }
  }

  countErrors = () => {
    if(this.state.showMessageBox === false) {
      this.setState({errorCount: this.state.errorCount + 1}, () => {
        if(this.state.errorCount > 2) this.setState({showMessageBox: true})
      })
    }
  }

  countHits = () => {
    if(this.state.showMessageBox === false)
      this.setState({hitCount: this.state.hitCount + 1})
  }

  randomInt = (min,max) => Math.floor(Math.random()*(max-min+1)+min)
  resetScore = () => this.setState({hitCount: 0, errorCount: 0, showMessageBox: false})

  moveTarget = () => {
    setTimeout(() => {
      const board = document.querySelector('#board')
      const bullseye = document.querySelector('#bullseye')
      const newPosition = {
        x: this.randomInt(0, board.offsetWidth - bullseye.offsetWidth),
        y: this.randomInt(0, board.offsetHeight - bullseye.offsetHeight)
      }

      this.setState({targetPosition: newPosition})
      this.moveTarget()
    }, 2000);
  }

  componentDidMount(){
    this.moveTarget()
  }

  render() {
    return (
      <div className='wrapper'>
        <h3 id="score">
          <span>miss {this.state.errorCount} </span>
          <span>hit {this.state.hitCount} </span>
          <a id="reset" type='button' value='reset' href="#" onClick={this.resetScore}>reset</a>
        </h3>
        <div id="bullseye" onClick={this.countHits}
          style={{top: this.state.targetPosition.y,
            left: this.state.targetPosition.x }}
        ><span role='img'>👻</span></div>
        <div id="board" onClick={this.countErrors} />
        <div id="message-box" style={ {display: (this.state.showMessageBox ? 'block' : 'none')} }>
          <h1>Game over</h1>
          <a id="reset" type='button' href="#" onClick={this.resetScore}>Try again?</a>
        </div>
      </div>
    );
  }
}

export default App;
