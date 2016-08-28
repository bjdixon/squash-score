import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './css/Container.css';
import Name from './Name';
import Color from './Color';
import Points from './Points';
import { setName, setColor, setThreshold } from '../actions';


class OptionsMenu extends Component {
  render() {
    const transform = { transform: `translateX(${ this.props.ui.view === 'OptionsMenu' ? '0' : '-100vw' })` };
    return (
      <nav className={ style.options } style={ transform }>
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

const mapStateToProps = (state) => {
  return { ui: state.ui };
};

export default connect(mapStateToProps)(OptionsMenu);
