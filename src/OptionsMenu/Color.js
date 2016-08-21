import React, { Component } from 'react';
import style from './css/Color.css';


export default class Color extends Component {
  render() {
    return (
      <div className="field">
        <div id={ this.props.ref } name={ this.props.ref } className="colorPicker">
          <div id={ this.props.ref + "output" } className="colorOutput"></div>
        </div>
      </div>
    );
  }
}



