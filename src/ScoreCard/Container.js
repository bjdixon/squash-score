import React, { Component } from 'react';
import { connect } from 'react-redux';
import tinycolor from 'tinycolor2';
import style from './css/Container.css';
import Button from './Button';
import Name from './Name';
import Score from './Score';
import Service from './Service';
import Message from './Message';
import { setScore, setServingPlayer, setServingSide, setChallenge, setWinner, undo, setMessageVisibility, setMessage } from '../actions';

class ScoreCard extends Component {
  render() {
    const servingPlayer = this.props.ui.servingPlayer;
    const color1 = this.props.options.color1;
    const color2 = this.props.options.color2;
    const textColor1 = tinycolor(color1).isLight() ? '#000000' : '#FFFFFF';
    const textColor2 = tinycolor(color2).isLight() ? '#000000' : '#FFFFFF';
    const pushedRight = this.props.ui.view !== 'ScoreCard' ? style.pushedRight : '';
    return (
      <div className={ `${style.container} ${pushedRight}` }>
        <div id="top">
          <Name player={ this.props.options.player1 } textColor={ textColor1 } color={ color1 } onClick={ this.props.updateServer.bind(this, 1) } isActive={ servingPlayer === 1 }/>
          <Name player={ this.props.options.player2 } textColor={ textColor2 } color={ color2 } onClick={ this.props.updateServer.bind(this, 2) } isActive={ servingPlayer === 2 }/>
          <Score points={ this.props.score.previousRally.score1 }/>
          <Score points={ this.props.score.previousRally.score2 }/>
          <Service onClick={ this.props.updateServingSide.bind(this, 'left') } isActive={ this.props.ui.servingSide === 'left' }/>
          <Service onClick={ this.props.updateServingSide.bind(this, 'right') } isActive={ this.props.ui.servingSide === 'right' }/>
          <Message title={ this.props.ui.messageTitle } secondaryMessage={ this.props.ui.secondaryMessage } isActive={ this.props.ui.messageVisible }/>
        </div>
        <div id="bottom">
          <Button text="Hand Out" onClick={ this.props.handout.bind(this, this.props) } color={ servingPlayer === 1 ? color2 : color1 } textColor={ servingPlayer === 1 ? textColor2 : textColor1 }/>
          <Button text="Point Won" onClick={ this.props.pointWon.bind(this, this.props) } color={ servingPlayer === 1 ? color1 : color2 } textColor={ servingPlayer === 1 ? textColor1 : textColor2 }/ >
          <Button text="Let" onClick={ this.props.challenge.bind(this, this.props.messages.let) }/>
          <Button text="Stroke" onClick={ this.props.challenge.bind(this, this.props.messages.stroke) }/>
          <Button text="No Let" onClick={ this.props.challenge.bind(this, this.props.messages['no let']) }/>
          <Button text="Undo" onClick={ this.props.undo.bind(this, this.props) }/>
        </div>
      </div>
    );
  }
}

ScoreCard.defaultProps = {
  messages: {
    'let': {
      title: 'Yes Let',
      secondaryMessage: '',
      timesout: true
    },
    'no let': {
      title: 'No Let',
      secondaryMessage: 'Award point or handout',
      timesout: false
    },
    'stroke': {
      title: 'Stroke',
      secondaryMessage: 'Award point or handout',
      timesout: false
    }
  }
};

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
      const newScore = props.score.previousRally['score' + playerNumber] + 1;
      dispatch(setMessageVisibility(false));
      dispatch(setScore(playerNumber, newScore));
      dispatch(setServingPlayer(playerNumber));
      dispatch(setServingSide('right'));
    },
    pointWon: (props) => {
      const playerNumber = props.ui.servingPlayer;
      const newScore = props.score.previousRally['score' + playerNumber] + 1;
      const newSide = props.ui.servingSide === 'left' ? 'right' : 'left';
      dispatch(setMessageVisibility(false));
      dispatch(setScore(playerNumber, newScore));
      dispatch(setServingSide(newSide));
    },
    undo: (props) => {
      if (props.score.previousRally.challenge) {
        const secondaryMessage = props.score.previousRally.challenge + ' Decision';
        dispatch(setMessage('Undo', secondaryMessage));
        dispatch(setMessageVisibility(true));
        setTimeout(() => dispatch(setMessageVisibility(false)), 2000)
      }
      dispatch(undo());
    },
    challenge: (message) => {
      dispatch(setChallenge(message.title));
      dispatch(setMessage(message.title, message.secondaryMessage));
      dispatch(setMessageVisibility(true));
      if (message.timesout) {
        setTimeout(() => dispatch(setMessageVisibility(false)), 2000)
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCard);
