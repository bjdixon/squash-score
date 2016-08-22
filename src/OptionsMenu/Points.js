import React, { Component } from 'react';
import style from './css/Container.css';


export default class Points extends Component {
  render() {
    return (
      <div className={ style.field }>
        <label htmlFor={ this.props.ref }>Points require to win</label>
        <input type="number" placeholder="11" name={ this.props.ref } /> 
      </div>
    );
  }
}



