import React, { Component } from 'react'
import './leftNav.less'
import TAB1 from './tab'

export default class MobileMenu extends Component {
   constructor (...args) {
       super(...args);
 
       this.state = {
           initData: '',
           show: false,
       }
   
   }

     
  render() {
    return (
      <div style={{height: 14}}>
        <TAB1/>
      </div>
     
    );     
  
  }
}
   