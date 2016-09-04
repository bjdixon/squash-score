import React, { Component } from 'react';
import style from './css/Message.css';


export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: style.message,
      messageTitle: '',
      secondaryMessage: ''
    };
    this.challenges = {
      'let': {
        title: 'Yes Let',
        secondaryMessage: '',
        timeout: 2000
      },
      'no let': {
        title: 'No Let',
        secondaryMessage: 'Award point or handout',
        timeout: 3000
      },
      'stroke': {
        title: 'Stroke',
        secondaryMessage: 'Award point or handout',
        timeout: 3000
      }
    };
  }
  componentWillReceiveProps(props) {
    if (props.challenge) {
      let className = this.state.className;
      this.state.messageTitle = this.challenges[props.challenge].title;
      this.state.secondaryMessage = this.challenges[props.challenge].secondaryMessage;
      this.state.className = style.active;
      setTimeout(function() {
        this.setState({ className: style.message });
      }.bind(this), this.challenges[props.challenge].timeout);
    }
  }
  render() {
    return (
      <div className={ this.state.className }>
        <strong>{ this.state.messageTitle }</strong>
        <br/>
        { this.state.secondaryMessage }
      </div>
    );
  }
}


