import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setHeadTitle} from '../../redux/actions.js'
import {Button} from 'antd'
import storageUtils from '../../utils/storageUtils.js'
import './NotFound.less'
class NotFound extends Component {

  goHome = () => {
    // 跳转到首页
    this.props.setHeadTitle('Home')
    this.props.history.push('/home')
  }

  componentWillMount = async() => {
    document.title = "Not Found"
  }

  
  render() {
    var theme = storageUtils.getTheme()
    var color = '#fff'
    var color2 = '#c5c5cc'
    var color3 = 'black'
    if(theme === 'dark'){
      color = 'rgb(27, 27, 27)'
      color2 = '#333'
      color3 = '#c2c2c2'
    }


    return (
      <div className="not-found" style={{backgroundColor: color}}>
        <div className="error-icon">
          <div id="holder">
            <h1 style={{marginLeft: '8%', marginTop: 20, color: color3}}>404 THE PAGE YOU REQUESTED IS TEMPORARY MISSING...</h1>
          </div>
          <Button style={{ backgroundColor: color, color: color3, borderColor: color2, marginTop: '20px'}} onClick={this.goHome}>RETURN TO HOME</Button>
        </div>


      </div>

    )
  }
}

export default connect(
  state => ({}),
  {setHeadTitle}
)(NotFound)