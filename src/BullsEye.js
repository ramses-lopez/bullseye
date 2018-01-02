import React, { Component } from 'react';

class BullsEye extends Component {
  render() {
    const top = 50
    const left = 50
    // const style = {}`position: relative; top: ${top}%; left: ${left}%`

    return (
      <div style={{top: `${top}%`, left: `${left}%`, position: 'relative' }} className="circle outer">
        <div className="circle middle">
          <div className="circle center-1">
            <div className="circle center">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BullsEye;
