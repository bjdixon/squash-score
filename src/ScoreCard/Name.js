import React, { Component, PropTypes } from 'react';
import style from './css/Name.css';


export default class Name extends Component {
  render() {
    return (
      <div className={ style.name } onClick={ this.props.onClick }>
        <span className={ style.nameOut }>
          { this.props.player }
        </span>
      </div>
    );
  }
}

Name.propTypes = {
  onClick: PropTypes.func.isRequired
};

