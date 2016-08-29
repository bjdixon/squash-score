import React, { Component } from 'react';
import style from './css/Container.css';


export default class Name extends Component {
  render() {
    return (
      <div className={ style.field }>
        <label htmlFor={ this.ref }>Player</label>
        <input type="text" placeholder={ this.props.player } onChange={ this.props.update } name={ this.ref } />
      </div>
    );
  }
}


