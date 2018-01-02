import React, { Component } from 'react';
import BullsEye from './BullsEye';

class Arena extends Component {
  render() {
    return (
      <div className="arena">
        <BullsEye x={50} y={50} />
      </div>
    );
  }
}

export default Arena;
