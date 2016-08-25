import React, { Component } from 'react';
import style from './css/Container.css';


export default class Color extends Component {
  render() {
    return (
      <div className={ style.field }>
        <div id={ this.ref } name={ this.ref } className="colorPicker">
          <div id={ this.ref + "output" } className="colorOutput"></div>
        </div>
      </div>
    );
  }
}



