import React, { Component } from 'react';
import style from './css/Message.css';


export default class Message extends Component {
  constructor(props) {
    super(props);
    this.challenges = {
      'let': {
        title: 'Yes Let',
        secondaryMessage: ''
      },
      'no let': {
        title: 'No Let',
        secondaryMessage: 'Award point or handout'
      },
      'stroke': {
        title: 'Stroke',
        secondaryMessage: 'Award point or handout'
      }
    };
  }
  render() {
    return (
      this.props.isActive ?
        <div className={ style.message }>
          <strong>{ this.challenges[this.props.challenge].title }</strong>
          <br/>
          { this.challenges[this.props.challenge].secondaryMessage }
        </div>
      : null
    );
  }
}


