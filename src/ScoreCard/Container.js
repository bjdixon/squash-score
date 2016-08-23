import React, { Component } from 'react';
import style from './css/Container.css';
import Button from './Button';
import Name from './Name';
import Score from './Score';
import Service from './Service';
import Message from './Message';
import simpleSwipeEvents from 'simple-swipe-events';


export default class ScoreCard extends Component {
  constructor(props) {
    super(props);
    this.pushRight = this.pushRight.bind(this);
  }
  componentDidMount() {
    window.addEventListener('swipe-right', this.pushRight, true);
  }
  componentWillUnmount() {
    window.removeEventListener('swipe-right', this.pushRight);
  }
  pushRight() {
    // handle animation
  }
  render() {
    return (
      <div className={ style.container }>
        <div id="top">
          <Name ref="player1" />
          <Name ref="player2" />
          <Score ref="score1" />
          <Score ref="score2" />
          <Service ref="serveLeft" />
          <Service ref="serveRight" />
          <Message />
        </div>
        <div id="bottom">
          <Button ref="handOut" text="Hand Out" />
          <Button ref="pointWon" text="Point Won" />
          <Button ref="let" text="Let" />
          <Button ref="stroke" text="Stroke" />
          <Button ref="noLet" text="No Let" />
          <Button ref="undo" text="Undo" />
        </div>
      </div>
    );
  }
}

