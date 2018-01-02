import React, { Component } from 'react';
// import Arena from './Arena';
// import SideBar from './SideBar';

import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      hitCount: 0,
      errorCount: 0,
      targetPosition: {x:'50%', y:'50%'}
    }
  }

  countErrors = () => this.setState({errorCount: this.state.errorCount + 1})
  countHits = () => this.setState({hitCount: this.state.hitCount + 1})
  randomInt = (min,max) => Math.floor(Math.random()*(max-min+1)+min)

  moveTarget = () => {
    setTimeout(() => {
      const board = document.querySelector('#board')

      const newPosition = {
        x: this.randomInt(0, board.offsetWidth),
        y: this.randomInt(0, board.offsetHeight)
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
        <h1 id="title">Bullseye!</h1>
        <ul id="score">
          <li>{this.state.hitCount} hits </li>
          <li>{this.state.errorCount} misses </li>
        </ul>
        <div id="bullseye" onClick={this.countHits}
          style={{top: this.state.targetPosition.y,
            left: this.state.targetPosition.x }}
        />
        <div id="board" onClick={this.countErrors} />
      </div>
    );
  }
}

export default App;
