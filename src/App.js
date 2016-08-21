import React, { Component } from 'react';
import ReactDom from 'react-dom';
import ScoreCard from './ScoreCard/Container';
import OptionsMenu from './OptionsMenu/Container';
import style from './App.css';


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
