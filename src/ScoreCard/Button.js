import React, { Component } from 'react';
import style from './css/Button.css';


export default class Button extends Component {
  render() {
    return (
      <div className={ style.button } onClick={ this.props.onClick }>
        { this.props.text }
      </div>
    );
  }
}

