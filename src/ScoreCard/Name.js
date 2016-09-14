import React, { Component, PropTypes } from 'react';
import style from './css/Name.css';


export default class Name extends Component {
  render() {
    const colors = {
      backgroundColor: this.props.color,
      color: this.props.textColor
    };
    return (
      <div className={ style.name } onClick={ this.props.onClick }>
        <span className={ style.nameOut } style={ colors }>
          <span className={ this.props.isActive && style.active }>{ this.props.player }</span>
        </span>
      </div>
    );
  }
}

Name.propTypes = {
  onClick: PropTypes.func.isRequired
};

