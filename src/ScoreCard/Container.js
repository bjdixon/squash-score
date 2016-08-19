import React, { Component } from 'react';
import styles from './css/Container.css';
import Button from './Button';
import Name from './Name';
import Score from './Score';
import Service from './Service';
import Message from './Message';


export default class ScoreCard extends Component {
  render() {
    return (
      <div id="container">
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

