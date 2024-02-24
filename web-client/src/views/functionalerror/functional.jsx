import React, { Component } from 'react'
import './functional.less'
import storageUtils from '../../utils/storageUtils'


export default class FunctionalError extends Component {


  componentDidMount(){
    document.title = "Functional Error "
  }

  render() {
    var message = ''
    if(this.props.message !== undefined){
      message = this.props.message
    }

    var theme = storageUtils.getTheme()
    var color = '#fff' // bright white 
    var color3 = 'black' 
    // var aba1m = 'main-container'
    // var draw1 = 'drawer-class'
    // var modalsdark = ''
    // var darkselect = ''
    if(theme === 'dark'){
      color = '#141414'
      color3 = '#c2c2c2'
      // aba1m = 'main-container-dark'
      // draw1 = 'drawer-class-dark'
      // modalsdark = 'dark-modalclass'
      // darkselect = 'dark-selectclass'
    }

    return (
      <div className="functional" style={{backgroundColor: color}}>

        <div className="error-icon">
        <div id="holder">
          
  <div id="box"></div>
  <div style={{color: color3}} id="shadow"></div>
  <h1 style={{marginLeft: '8%', marginTop: 20, color: color3}}>Experienced functional error, try refreshing page...</h1>
  <p style={{color: color3}}>Report this issue to our team</p>
  <p style={{color: color3}}>{message}</p>
</div>

       
        </div>


      </div>

    )
  }
}
