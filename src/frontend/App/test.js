import React, { Component } from 'react'
import Counts from '../Components/Dashboard/Counts';
import styles from "./styles.css"
class TEST extends Component {
  render() {
      return (
        <div>
        HHHHHHHHH111dsaf
        <div className={styles.count}>{7}</div>
        <Counts label={'Users'} count={8} />
        </div>
      );
    } 
}

export default TEST