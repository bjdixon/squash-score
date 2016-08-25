import React, { Component } from 'react';
import style from './css/Container.css';
import Button from './Button';
import Name from './Name';
import Score from './Score';
import Service from './Service';
import Message from './Message';


export default class ScoreCard extends Component {
  switchServer() {
    // switch serving player
  }
  switchSide(side) {
    // switch serving side
    console.log(side);
  }
  handOut() {
    // switch serving player and increment the new serving player's score
  }
  pointWon() {
    // increment serving player's score
  }
  yesLet() {
    // show let message and reset rally
  }
  noLet() {
    // show no let message and prompt for hand out or point won to be awarded
  }
  stroke() {
    // show stroke message and prompt for hand out or point won to be awarded
  }
  undo() {
    // remove last action
  }
  render() {
    return (
      <div className={ style.container }>
        <div id="top">
          <Name ref="player1" onClick={ this.switchServer.bind(this) } />
          <Name ref="player2" onClick={ this.switchServer.bind(this) } />
          <Score ref="score1" />
          <Score ref="score2" />
          <Service ref="serveLeft" onClick={ this.switchSide.bind(this) } />
          <Service ref="serveRight" onClick={ this.switchSide.bind(this) } />
          <Message />
        </div>
        <div id="bottom">
          <Button ref="handOut" text="Hand Out" onClick={ this.handOut.bind(this) } />
          <Button ref="pointWon" text="Point Won" onClick={ this.pointWon.bind(this) } />
          <Button ref="let" text="Let" onClick={ this.yesLet.bind(this) } />
          <Button ref="stroke" text="Stroke" onClick={ this.stroke.bind(this) } />
          <Button ref="noLet" text="No Let" onClick={ this.noLet.bind(this) } />
          <Button ref="undo" text="Undo" onClick={ this.undo.bind(this) } />
        </div>
      </div>
    );
  }
}

