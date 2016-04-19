(() => {
  const EventEmitter = require('events');
  const emitter = new EventEmitter();
  const rally = require('./rally');
  const doc = window.document;
  
  let game = [rally.rallyContainer];
  const currentRally = () => game[game.length -1];
  const showMessage = (messageTitle, messageDetail) => {
    document.getElementById('message').innerHTML = `<strong>${messageTitle}</strong><br>${messageDetail || ''}`;
    document.getElementById('message').classList.add('active');
  };

  doc.getElementById('handOut').onclick = () => {
    game.push(rally.handOut(currentRally()));
    emitter.emit('scoreUpdated');
  };
 
  doc.getElementById('pointWon').onclick = () => {
    game.push(rally.pointWon(currentRally()));
    emitter.emit('scoreUpdated');
  };

  doc.getElementById('let').onclick = () => {
    game.push(rally.challengeDecision('let')(currentRally()));
    showMessage('Yes Let');
    setTimeout(() => document.getElementById('message').classList.remove('active'), 2000);
  };

  doc.getElementById('noLet').onclick = () => {
    game.push(rally.challengeDecision('let')(currentRally()));
    showMessage('No Let', 'Award point or handout');
  };

  doc.getElementById('stroke').onclick = () => {
    game.push(rally.challengeDecision('let')(currentRally()));
    showMessage('Stroke', 'Award point or handout');
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
