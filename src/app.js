(() => {
  const compose = require('xo-utils').compose;
  const curry = require('xo-utils').curry;
  const rally = require('immutable').Map({
    player1: 0,
    player2: 0,
    servingPlayer: 'player1',
    servingSide: 'right',
    challenge: null,
    winner: null
  });

  let game = [rally];
  
  const incrementScore = (rally) => {
    const player = rally.get('servingPlayer');
    return rally.set(player, rally.get(player) + 1);
  };

  const changeServer = (rally) => {
    return rally.set('servingPlayer', rally.get('servingPlayer') === 'player1' ? 'player2' : 'player1');
  };

  const switchServingSide = (rally) => {
    return rally.set('servingSide', rally.get('servingSide') === 'left' ? 'right' : 'left');
  };

  const challengeDecision = (decision) => {
    return (rally) => {
      return rally.set('challenge', decision);
    };
  };

  const setWinner = (rally) => {
    const player = rally.get('servingPlayer');
    return rally.set('winner', player);
  };

  const rallyWon = (rally) => {
    return compose(switchServingSide, incrementScore, setWinner)(rally);
  };

  const handOut = (rally) => {
    if (rally.get('servingSide') === 'right') {
      return compose(rallyWon, changeServer, switchServingSide)(rally);
    }
    return compose(rallyWon, changeServer)(rally);
  };

  window.document.getElementById('handOut').onclick = () => {
    game.push(handOut(game[game.length - 1]));
  };
  window.document.getElementById('pointWon').onclick = () => {
    game.push(rallyWon(game[game.length - 1]));
  };

  window.document.getElementById('bottom').onclick = () => {
    const lastRally = game[game.length - 1];
    const servingSide = lastRally.get('servingSide');
    window.document.getElementById('score1').innerHTML = lastRally.get('player1');
    window.document.getElementById('score2').innerHTML = lastRally.get('player2');

    let serveActive = 'serveLeft',
      serveInactive = 'serveRight';
    if (servingSide === 'right') {
      serveActive = 'serveRight',
      serveInactive = 'serveLeft';
    }
    window.document.getElementById(serveInactive).classList.remove('active');
    window.document.getElementById(serveActive).classList.add('active');

    window.document.getElementById(lastRally.get('servingPlayer') === 'player1' ? 'player2' : 'player1').classList.remove('active');
    window.document.getElementById(lastRally.get('servingPlayer')).classList.add('active');

  };

})();

