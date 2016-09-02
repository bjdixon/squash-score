import React, { Component } from 'react';
import style from './css/Score.css';


export default class Score extends Component {
  render() {
    return (
      <div className={ style.score }>
        { this.props.points }
      </div>
    );
  }
}

