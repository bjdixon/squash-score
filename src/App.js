import React, { Component } from 'react';
import ReactDom from 'react-dom';
import ScoreCard from './containers/ScoreCard'
import OptionsMenu from './containers/OptionsMenu'


class Content extends Component {
  render() {
    return (
      <div>
        <ScoreCard />
        <OptionsMenu />,
      </div>
    );
  }
}

ReactDom.render(<Content />, document.getElementById('content'));
