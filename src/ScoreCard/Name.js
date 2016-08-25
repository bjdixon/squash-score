import React, { Component } from 'react';
import style from './css/Name.css';


export default class Name extends Component {
  render() {
    return (
      <div className={ style.name } onClick={ this.props.onClick }>
        <span className={ style.nameOut }>
          Name
        </span>
      </div>
    );
  }
}

Name.propTypes = {
  onClick: React.PropTypes.function
};

