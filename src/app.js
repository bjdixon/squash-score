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
  const removeMessage = (time) => {
    setTimeout(() => document.getElementById('message').classList.remove('active'), time);
  };
  const switchSides = function () {
    if (!this.classList.contains('active')) {
      game.push(rally.switchServingSide(currentRally()));
      emitter.emit('stateUpdated');
    }
  };

  doc.getElementById('handOut').onclick = () => {
    game.push(rally.handOut(currentRally()));
    emitter.emit('stateUpdated');
  };
 
  doc.getElementById('pointWon').onclick = () => {
    game.push(rally.pointWon(currentRally()));
    emitter.emit('stateUpdated');
  };

  doc.getElementById('let').onclick = () => {
    game.push(rally.challengeDecision('let')(currentRally()));
    showMessage('Yes Let');
    removeMessage(2000);
  };

  doc.getElementById('noLet').onclick = () => {
    game.push(rally.challengeDecision('no let')(currentRally()));
    showMessage('No Let', 'Award point or handout');
  };

  doc.getElementById('stroke').onclick = () => {
    game.push(rally.challengeDecision('stroke')(currentRally()));
    showMessage('Stroke', 'Award point or handout');
  };

  doc.getElementById('undo').onclick = () => {
    if (game.length > 1) {
      const removedRally = game.pop();
      if (removedRally.get('player1') !== currentRally().get('player1') || removedRally.get('player2') !== currentRally().get('player2')) {
        emitter.emit('stateUpdated');
      } else {
        showMessage('Decision undone', `(${removedRally.get('challenge')})`);
        removeMessage(1500);
      }
    }
  };

  doc.getElementById('serveLeft').onclick = switchSides;
  doc.getElementById('serveRight').onclick = switchSides;

  emitter.on('stateUpdated', () => {
    const servingSide = currentRally().get('servingSide');
    const servingPlayer = currentRally().get('servingPlayer');
    Array.prototype.slice.call(doc.getElementsByClassName('active')).forEach((el) => el.classList.remove('active'));
    doc.getElementById('score1').innerHTML = currentRally().get('player1');
    doc.getElementById('score2').innerHTML = currentRally().get('player2');
    doc.getElementById(servingSide === 'right' ? 'serveRight' : 'serveLeft').classList.add('active');
    doc.getElementById(servingPlayer === 'player1' ? 'player1' : 'player2').classList.add('active');
  });

})();
