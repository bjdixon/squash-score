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
        <Name ref="player1name" player={ this.props.options.player1 } update={ this.props.updateName.bind(this, 1) }/>
        <Color ref="player1color" />
        <Name ref="player2name" player={ this.props.options.player2 } update={ this.props.updateName.bind(this, 2) }/>
        <Color ref="player2color" />
        <Points ref="pointsThreshold" />
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    options: state.options
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    updateName: (playerNumber, e) => {
      dispatch(setName(playerNumber, e.target.value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsMenu);
