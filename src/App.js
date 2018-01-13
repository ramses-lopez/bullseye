import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      hitCount: 0,
      errorCount: 0,
      targetPosition: {x:'50%', y:'50%'},
      crossPosition: {x:'50%', y:'50%'},
      crossStyle: {backgroundColor:''},
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

  moveCrosshair = e => {
    const crosshair = document.querySelector('#crosshair')
    const top = parseInt(crosshair.style.top.slice(0, -1))
    const left = parseInt(crosshair.style.left.slice(0, -1))
    const step = 7.5

    switch (e.keyCode) {
      case 32:
        this.setState({crossStyle: {backgroundColor: 'red'}})
        setTimeout(() => this.setState({crossStyle: {backgroundColor: ''}}), 50)
        break;
      case 37:
        this.setState({crossPosition: {
          x: ((left - step) + '%'),
          y: this.state.crossPosition.y
        }})
        break;
      case 38:
        // up
        this.setState({crossPosition: {
          x: this.state.crossPosition.x,
          y: ((top - step) + '%')
        }})
        break;
      case 39:
        // right
        this.setState({crossPosition: {
          x: ((left + step) + '%'),
          y: this.state.crossPosition.y
        }})
        break;
      case 40:
        // down
        this.setState({crossPosition: {
          y: ((top + step) + '%'),
          x: this.state.crossPosition.x
        }})
        break;
      default:
        //nothing
    }
  }

  componentDidMount(){
    this.moveTarget()
  }

  render() {
    return (
      <div className='wrapper' tabIndex={0} onKeyDown={this.moveCrosshair}>
        <h3 id="score">
          <span>miss {this.state.errorCount} </span>
          <span>hit {this.state.hitCount} </span>
          <a id="reset" type='button' value='reset' href="#" onClick={this.resetScore}>reset</a>
        </h3>
        <div id="crosshair"
          style={{backgroundColor: this.state.crossStyle.backgroundColor, top: this.state.crossPosition.y, left: this.state.crossPosition.x }}>
          <span role="img" style={{width: 'fit-content'}}>❌</span>
        </div>
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
