import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './css/Container.css';
import Button from './Button';
import Name from './Name';
import Score from './Score';
import Service from './Service';
import Message from './Message';
import { setScore, setServingPlayer, setServingSide, setChallenge, setWinner } from '../actions';

class ScoreCard extends Component {
  render() {
    const transform = { transform: `translateX(${ this.props.ui.view === 'ScoreCard' ? '0' : '100vw' })` };
    return (
      <div className={ style.container } style={ transform }>
        <div id="top">
          <Name ref="player1" player={ this.props.options.player1 } onClick={ this.props.updateServer.bind(this, 1) } isActive={ this.props.ui.servingPlayer === 1 }/>
          <Name ref="player2" player={ this.props.options.player2 } onClick={ this.props.updateServer.bind(this, 2) } isActive={ this.props.ui.servingPlayer === 2 }/>
          <Score ref="score1" />
          <Score ref="score2" />
          <Service ref="serveLeft" onClick={ this.props.updateServingSide.bind(this, 'left') } isActive={ this.props.ui.servingSide === 'left' }/>
          <Service ref="serveRight" onClick={ this.props.updateServingSide.bind(this, 'right') } isActive={ this.props.ui.servingSide === 'right' }/>
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

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    options: state.options
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    updateServer: (playerNumber) => {
      dispatch(setServingPlayer(playerNumber));
    },
    updateServingSide: (side) => {
      dispatch(setServingSide(side));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCard);
