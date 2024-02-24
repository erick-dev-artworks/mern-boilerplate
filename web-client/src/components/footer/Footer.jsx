import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions.js'
import { Button, Modal, Select  } from 'antd'
// import { Modal } from 'antd'
import { listUser } from '../../api/index';
// import formatDate from '../../utils/dateUtils'
// import menuList from '../../config/menuConfig'
import './footer.less'
import storageUtils from '../../utils/storageUtils';
import MediaQuery from 'react-responsive'
import 'antd/dist/antd.css';
import axios from "axios";


class Footer extends Component {
  state = {
    username: ''
  }
  // getTime = () => {
  //   // 每隔一秒钟获取当前时间
  //   this.timer = setInterval(() => {
  //     const currentTime = formatDate(Date.now())
  //     this.setState({currentTime})
  //   }, 1000)
  // }

  
  // getTitle = (menuList) => {
  //   const path = this.props.location.pathname.replace(/^\/product[\D]+/, '/product')
  //   // 通过当前路由找到对应的菜单项名称
  //   let title
  //   menuList.forEach(item => {
  //     if (item.children) {
  //       // 有子级菜单
  //       const cItem = item.children.find(item => {return item.key === path})
  //       if (cItem) title = cItem.title
  //     } else {
  //       // 无子级菜单
  //       if (item.key === path) title = item.title
  //     }
  //   })
  //   return title
  // }


  recieveUser = async() => {
    var user = storageUtils.getUser()
    var session = storageUtils.getId()
    var ssid1 = storageUtils.getId1()
    var ssid2 = storageUtils.getId2()
    var language = storageUtils.getLanguage()
    var cancelToken = this.source.token
    var response = await listUser(user, session, ssid1, ssid2, language, cancelToken)
    if(response.status === 0){
      this.setState({username: response.data.user})
    } 

  }

  componentWillMount(){
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();

    this.recieveUser()
  }

  componentWillUnmount(){
    this.source.cancel('');
  }
  
  
  render() {

    return (
      <div>
        <MediaQuery minWidth={451}>
        <div className='Footer'>
        <div className="Footer-top">
          <div className="side-by-side">
            <div style={{width: '80%'}}>
              <p style={{color: 'white'}}>AMA</p>
              
            </div>
            <Button style={{width: '5%'}} onClick={() => { }}>Messages</Button>
            <div style={{width: '20%', textAlign: 'center'}}>
              <span style={{fontSize: '15px', color: 'white'}}>{document.title } - SUCCESS</span>
              
            </div>
          </div>
          
          
          
          
         
        </div>
       
        
      </div>
        </MediaQuery>

      <MediaQuery maxWidth={450}>
   
      <div className='Footer'>
        <div className="Footer-top">
       
           
          <span style={{marginTop: 10}}>FAILED</span>
         
        </div>
        
      </div>
         
          
        </MediaQuery> 
      
        
      </div>
     
        
     
    )
  }
}

export default connect(
  state => ({headTitle: state.setHeadTitle, user: state.user}),
  {logout}
)(withRouter(Footer))