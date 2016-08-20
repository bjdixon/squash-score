import React, { Component } from 'react';
import styles from './css/Container.css';
import Name from './Name';
import Color from './Color';
import Points from './Points';


export default class OptionsMenu extends Component {
  render() {
    return (
      <nav className={ styles.root }>
        <div id="optionsTitle">Game Options</div>
        <Name ref="player1name" />
        <Color ref="player1color" />
        <Name ref="player2name" />
        <Color ref="player2color" />
        <Points ref="pointsThreshold"/>
      </nav>
    );
  }
}

