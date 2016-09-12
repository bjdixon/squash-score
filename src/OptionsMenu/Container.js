import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './css/Container.css';
import Name from './Name';
import Color from './Color';
import Points from './Points';
import { setName, setColor, setThreshold } from '../actions';


class OptionsMenu extends Component {
  render() {
    const active = this.props.ui.view === 'OptionsMenu' ? style.active : '';
    return (
      <nav className={ `${style.options} ${active}` }>
        <h2>Game Options</h2>
        <Name player={ this.props.options.player1 } update={ this.props.updateName.bind(this, 1) }/>
        <Color color={ this.props.options.color1 } update={ this.props.updateColor.bind(this, 1) }/>
        <Name player={ this.props.options.player2 } update={ this.props.updateName.bind(this, 2) }/>
        <Color color={ this.props.options.color2 } update={ this.props.updateColor.bind(this, 2) }/>
        <Points update={ this.props.updateThreshold.bind(this) }/>
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateName: (playerNumber, e) => {
      dispatch(setName(playerNumber, e.target.value));
    },
    updateThreshold: (e) => {
      dispatch(setThreshold(e.target.value));
    },
    updateColor: (playerNumber, color) => {
      dispatch(setColor(playerNumber, color));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsMenu);
