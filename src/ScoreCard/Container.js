import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './css/Container.css';
import Button from './Button';
import Name from './Name';
import Score from './Score';
import Service from './Service';
import Message from './Message';
import { setScore, setServingPlayer, setServingSide, setChallenge, setWinner, undo, setMessageVisibility } from '../actions';

class ScoreCard extends Component {
  render() {
    const pushedRight = this.props.ui.view !== 'ScoreCard' ? style.pushedRight : '';
    return (
      <div className={ `${style.container} ${pushedRight}` }>
        <div id="top">
          <Name player={ this.props.options.player1 } onClick={ this.props.updateServer.bind(this, 1) } isActive={ this.props.ui.servingPlayer === 1 }/>
          <Name player={ this.props.options.player2 } onClick={ this.props.updateServer.bind(this, 2) } isActive={ this.props.ui.servingPlayer === 2 }/>
          <Score points={ this.props.score.rallies[this.props.score.rallies.length -1].score1 }/>
          <Score points={ this.props.score.rallies[this.props.score.rallies.length -1].score2 }/>
          <Service onClick={ this.props.updateServingSide.bind(this, 'left') } isActive={ this.props.ui.servingSide === 'left' }/>
          <Service onClick={ this.props.updateServingSide.bind(this, 'right') } isActive={ this.props.ui.servingSide === 'right' }/>
          <Message challenge={ this.props.score.rallies[this.props.score.rallies.length -1].challenge } isActive={ this.props.ui.messageVisible }/>
        </div>
        <div id="bottom">
          <Button text="Hand Out" onClick={ this.props.handout.bind(this, this.props) }/>
          <Button text="Point Won" onClick={ this.props.pointWon.bind(this, this.props) }/>
          <Button text="Let" onClick={ this.props.challenge.bind(this, 'let') }/>
          <Button text="Stroke" onClick={ this.props.challenge.bind(this, 'stroke') }/>
          <Button text="No Let" onClick={ this.props.challenge.bind(this, 'no let') }/>
          <Button text="Undo" onClick={ this.props.undo.bind(this) }/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    options: state.options,
    score: state.score
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateServer: (playerNumber) => {
      dispatch(setServingPlayer(playerNumber));
    },
    updateServingSide: (side) => {
      dispatch(setServingSide(side));
    },
    handout: (props) => {
      const playerNumber = props.ui.servingPlayer === 1 ? 2 : 1;
      const rallies = props.score.rallies;
      const newScore = rallies[rallies.length -1]['score' + playerNumber] + 1;
      dispatch(setMessageVisibility(false));
      dispatch(setScore(playerNumber, newScore));
      dispatch(setServingPlayer(playerNumber));
      dispatch(setServingSide('right'));
    },
    pointWon: (props) => {
      const playerNumber = props.ui.servingPlayer;
      const rallies = props.score.rallies;
      const newScore = rallies[rallies.length -1]['score' + playerNumber] + 1;
      const newSide = props.ui.servingSide === 'left' ? 'right' : 'left';
      dispatch(setMessageVisibility(false));
      dispatch(setScore(playerNumber, newScore));
      dispatch(setServingSide(newSide));
    },
    undo: () => {
      dispatch(undo());
    },
    challenge: (decision) => {
      dispatch(setChallenge(decision));
      dispatch(setMessageVisibility(true));
      if (decision === 'let') {
        setTimeout(() => dispatch(setMessageVisibility(false)), 3000)
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCard);
