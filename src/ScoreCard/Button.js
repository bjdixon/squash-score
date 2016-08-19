import React, { Component } from 'react';
import styles from './css/Button.css';


export default class Button extends Component {
  render() {
    return (
      <div className="component button">
        { this.props.text }
      </div>
    );
  }
}

