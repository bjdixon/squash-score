import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './css/Container.css';
import Name from './Name';
import Color from './Color';
import Points from './Points';
import { setName, setColor, setThreshold } from '../actions';


export default class OptionsMenu extends Component {
  render() {
    return (
      <nav className={ style.options }>
        <h2>Game Options</h2>
        <Name ref="player1name" />
        <Color ref="player1color" />
        <Name ref="player2name" />
        <Color ref="player2color" />
        <Points ref="pointsThreshold"/>
      </nav>
    );
  }
}

