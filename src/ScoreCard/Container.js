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
  noop() {
    //
  }
  render() {
    const transform = { transform: `translateX(${ this.props.ui.view === 'ScoreCard' ? '0' : '100vw' })` };
    return (
      <div className={ style.container } style={ transform }>
        <div id="top">
          <Name player={ this.props.options.player1 } onClick={ this.props.updateServer.bind(this, 1) } isActive={ this.props.ui.servingPlayer === 1 }/>
          <Name player={ this.props.options.player2 } onClick={ this.props.updateServer.bind(this, 2) } isActive={ this.props.ui.servingPlayer === 2 }/>
          <Score points={ this.props.score.rallies[this.props.score.rallies.length -1].score1 }/>
          <Score points={ this.props.score.rallies[this.props.score.rallies.length -1].score2 }/>
          <Service onClick={ this.props.updateServingSide.bind(this, 'left') } isActive={ this.props.ui.servingSide === 'left' }/>
          <Service onClick={ this.props.updateServingSide.bind(this, 'right') } isActive={ this.props.ui.servingSide === 'right' }/>
          <Message />
        </div>
        <div id="bottom">
          <Button text="Hand Out" onClick={ this.props.handout.bind(this, this.props) }/>
          <Button text="Point Won" onClick={ this.noop.bind(this) }/>
          <Button text="Let" onClick={ this.noop.bind(this) }/>
          <Button text="Stroke" onClick={ this.noop.bind(this) }/>
          <Button text="No Let" onClick={ this.noop.bind(this) }/>
          <Button text="Undo" onClick={ this.noop.bind(this) }/>
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
      dispatch(setScore(playerNumber, newScore));
      dispatch(setServingPlayer(playerNumber));
      dispatch(setServingSide('right'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCard);
