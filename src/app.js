(() => {
  const EventEmitter = require('events');
  const emitter = new EventEmitter();
  const rally = require('./rally');
  const doc = window.document;
  
  let game = [rally.rallyContainer];

  doc.getElementById('handOut').onclick = () => {
    game.push(rally.handOut(game[game.length - 1]));
    emitter.emit('scoreUpdated');
  };
 
  doc.getElementById('pointWon').onclick = () => {
    game.push(rally.pointWon(game[game.length - 1]));
    emitter.emit('scoreUpdated');
  };

  emitter.on('scoreUpdated', () => {
    const currentRally = game[game.length - 1];
    const servingSide = currentRally.get('servingSide');
    const servingPlayer = currentRally.get('servingPlayer');
    Array.prototype.slice.call(doc.getElementsByClassName('active')).forEach((el) => el.classList.remove('active'));
    doc.getElementById('score1').innerHTML = currentRally.get('player1');
    doc.getElementById('score2').innerHTML = currentRally.get('player2');
    doc.getElementById(servingSide === 'right' ? 'serveRight' : 'serveLeft').classList.add('active');
    doc.getElementById(servingPlayer === 'player1' ? 'player1' : 'player2').classList.add('active');
  });

})();
