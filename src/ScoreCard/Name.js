import React, { Component } from 'react';
import style from './css/Name.css';


export default class Name extends Component {
  render() {
    return (
      <div className={ style.name }>
        <span className={ style.nameOut }>
          Name
        </span>
      </div>
    );
  }
}

