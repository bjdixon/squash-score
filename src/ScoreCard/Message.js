import React, { Component } from 'react';
import style from './css/Message.css';


export default class Message extends Component {
  render() {
    return (
      this.props.isActive ?
        <div className={ style.message }>
          <strong>{ this.props.title }</strong>
          <br/>
          { this.props.secondaryMessage }
        </div>
      : null
    );
  }
}


