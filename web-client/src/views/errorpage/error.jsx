import React, { Component } from 'react'
import './error.less'
import {
  Button
} from 'antd'
import { logoutIf, endSession } from '../../api/index';
import storageUtils from '../../utils/storageUtils';
import {connect} from 'react-redux'
import {logout} from '../../redux/actions.js'
import { withRouter } from 'react-router-dom'
import axios from "axios";




class ErrorHandler extends Component {
  
  logOut = async() => {
    var user = storageUtils.getUser()
    var session = storageUtils.getId()
    var ssid1 = storageUtils.getId1()
    var ssid2 = storageUtils.getId2()
    await storageUtils.removeUser()
    await storageUtils.removeId()
    await storageUtils.removeId1()
    await storageUtils.removeId2()
    await storageUtils.removeLanguage()
    var language = await storageUtils.getLanguage()
    var cancelToken = this.source.token

    await endSession(user, session, ssid1, ssid2, language, cancelToken)
    await logoutIf({user, session, ssid1, ssid2, language, cancelToken})
    this.props.logout()
  }


  componentDidMount(){
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();


    document.title = "Critical Error | BITBLOCK"
  }

  componentWillUnmount(){
    this.source.cancel('');
  }

  render() {
    var message = ''
    if(this.props.props5 !== undefined){
      message = this.props.props5
    }

    return (
      <div className="errorclass">
      <div className="mk1ac2" aria-readonly={true}>
        <div id="main">
    	<div className="fof">
            
        		<h1>WE ARE WORKING ON THIS ISSUE</h1>
            <p style={{fontSize: '18px', color: 'black'}}>{message}</p>
            <p>If it doesn't disaper in a few hours report this issue to our team</p>
           
            <img style={{height: '177px'}} src={"http://localhost:7240/upload/chess-figures.png"} alt=""/>
            <Button style={{marginTop: 170, position: 'absolute', right: '47%'}} onClick={() => { this.logOut()}}>LOG OUT</Button>

            
            
    	</div>
      </div>

</div>
    
      </div>
    );
      
  }
}

export default connect(
  state => ({headTitle: state.setHeadTitle, user: state.user}),
  {logout}
)(withRouter(ErrorHandler))