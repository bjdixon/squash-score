import React, { Component } from 'react';
import style from './css/Container.css';


export default class Name extends Component {
  render() {
    return (
      <div className={ style.field }>
        <label htmlFor={ this.props.ref }>Player</label>
        <input type="text" placeholder="Name" name={ this.props.ref } /> 
      </div>
    );
  }
}


