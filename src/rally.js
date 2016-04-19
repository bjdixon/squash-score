(() => {
const compose = require('xo-utils').compose;
const curry = require('xo-utils').curry;

const rallyContainer = require('immutable').Map({
  player1: 0,
  player2: 0,
  servingPlayer: 'player1',
  servingSide: 'right',
  challenge: null,
  winner: null
});

const incrementScore = (rallyContainer) => {
  const player = rallyContainer.get('servingPlayer');
  return rallyContainer.set(player, rallyContainer.get(player) + 1);
};

const changeServer = (rallyContainer) => {
  return rallyContainer.set('servingPlayer', rallyContainer.get('servingPlayer') === 'player1' ? 'player2' : 'player1');
};

const switchServingSide = (rallyContainer) => {
  return rallyContainer.set('servingSide', rallyContainer.get('servingSide') === 'left' ? 'right' : 'left');
};

const challengeDecision = (decision) => {
  return (rallyContainer) => {
    return rallyContainer.set('challenge', decision);
  };
};

const setWinner = (rallyContainer) => {
  const player = rallyContainer.get('servingPlayer');
  return rallyContainer.set('winner', player);
};

const pointWon = (rallyContainer) => {
  return compose(switchServingSide, incrementScore, setWinner)(rallyContainer);
};

const handOut = (rallyContainer) => {
  return rallyContainer.get('servingSide') === 'right' ?
    compose(pointWon, changeServer, switchServingSide)(rallyContainer) :
    compose(pointWon, changeServer)(rallyContainer);
};

module.exports = {
  rallyContainer,
  handOut,
  pointWon,
  challengeDecision,
  switchServingSide,
  changeServer
};

})();
