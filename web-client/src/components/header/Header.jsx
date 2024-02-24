import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions.js'
import { Button, Menu, Icon, Tooltip, Modal  } from 'antd'
import { LogoutOutlined, FullscreenOutlined, MenuFoldOutlined } from '@ant-design/icons'
import './header.less'
import storageUtils from '../../utils/storageUtils';
import MobileMenu from '../left-nav/LeftNav-mobile';
import MediaQuery from 'react-responsive'
import axios from "axios";
import menuList from '../../config/menuConfig'
import {setHeadTitle} from '../../redux/actions.js'


const { SubMenu } = Menu;
const { confirm } = Modal;

class Header extends Component {
  state = {
    dayPictureUrl: '',
    username: '',
    currency: '',
    checked: false,
    clock: 'May 23, 00:00:00' ,
    fullscreen: 'off',
    currentDefault: 'white',
    loading: true,
    previousPage: ''
  }
 

  handleChange = async(value) => {
    await storageUtils.saveLanguage(value)
    window.location.reload();
  }
  
  logout = async() => {
    var theme = storageUtils.getTheme()
    var classB = 'exit'
    if(theme === 'dark'){
      classB = 'exit-dark'
    }
    

    await confirm({
      content: (<div style={{justifyContent: 'center', display: 'grid'}}>
        <div className='logout-icon'></div>
        <p style={{fontSize: '12px', marginTop: '15px'}}>Are you sure to exit?</p>
      </div>),
      okText: 'Log Out',
      cancelText: 'Cancel',
      className: classB,
      onOk: async() => {
        await storageUtils.removeUser()
        await storageUtils.removeId()
        await storageUtils.removeId1()
        await storageUtils.removeId2()
        await storageUtils.deleteTradeBots()
        await storageUtils.deleteTradeBots2()
        await storageUtils.removeLanguage()
        await storageUtils.deleteBalances()
        await storageUtils.deleteBalancesFutures()
        await storageUtils.deleteTOTALBalances()
        await storageUtils.deleteTOTALBalancesFutures()
        await storageUtils.deleteTrades()
        await storageUtils.deleteTradesFutures()
        await storageUtils.deleteFULLTrades()
        await storageUtils.deleteFULLTradesFutures()
        await storageUtils.deleteOpenOrders()
        await storageUtils.deleteOpenOrdersFutures()
        await storageUtils.deleteProduct()
        await storageUtils.deleteTheme()
        await storageUtils.deleteCrypto()
        await storageUtils.deleteCryptoFutures()
        await storageUtils.deleteTech()
        await storageUtils.deleteNews()
        await storageUtils.deleteFavSymbols()
        await storageUtils.deletePlans()  
        await storageUtils.deletePINSession()      
        Modal.destroyAll()
      }
    })
   
  }

 
  updateClock = async() => {
    setInterval(async() => {
      var date = new Date(Date.now())
      var day = date.getUTCDate();
      var month = date.getUTCMonth();

      var hours = date.getUTCHours();
      var minutes = date.getUTCMinutes();
      var seconds = date.getUTCSeconds()

      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];


      var formated = monthNames[month] + ' ' + day + ', ' + hours + ':' + minutes + ':' + seconds

      await this.setState({
        clock: formated
      })

    }, 1000)
  }

  
  componentDidUpdate = async() => {
    var theme = await storageUtils.getTheme()
    if(this.state.currentDefault !== theme ){
      this.setState({currentDefault: theme})
    }


  }

  componentDidMount = async() => {
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    this.updateClock()

    var theme2 = await storageUtils.getTheme()
    this.setState({currentDefault: theme2})
  }

  componentWillUnmount(){
    this.source.cancel('');
  }
  
  moveFullScreen = () => {
    if(this.state.fullscreen === "on"){

      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }

      this.setState({
        fullscreen: "off"
      })
    
    } else {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }

      this.setState({
        fullscreen: "on"
      })
    }

   
  }

  hasAuth = (item) => {
    if (this.props.user) {
      return true
    } else {
      return false

    }
  }

  getMenuNodes = (menuList, theme) => {
    
    const path = this.props.location.pathname.replace(/^\/trade-history[\D]+/, '/trade-history')
    return (
      menuList.map(item => {
        if (this.hasAuth(item)) {
          if (!item.children) {
            if (item.key === path) {
              setHeadTitle(item.title)
            }

            var color = ''
            var color2 = ''

            if(theme === 'dark'){
              color = '#c2c2c2'
              color2 = '#141414'
            }

            if(item['icon'] === 'menufold'){
              return (
                <Menu.Item style={{backgroundColor: color2 }}key={item.key} onClick={() => setHeadTitle(item.title)}>
                   <Tooltip placement="bottom" title={item.title}>
                    <MenuFoldOutlined style={{color: color, fontSize: '13px'}}/>
                   </Tooltip>
                </Menu.Item>
                )
            } else {
              return (
                <Menu.Item style={{backgroundColor: color2 }}key={item.key} onClick={() => setHeadTitle(item.title)}>
                  <Tooltip placement="bottom" title={item.title}>
                    <Icon style={{color: color, fontSize: '13px'}} type={item.icon}  />

                  </Tooltip>
                </Menu.Item>
               
                
                )
            }

            
          } else {
            if (item.children.find(cItem => {
              return cItem.key === path
            })) {
              this.openKey = item.key
            }

            if(item['icon'] === 'menufold'){
              return (
              
                <SubMenu
                key={item.key}
                style={{backgroundColor: color2, borderRightStyle: '1px sold black'}}
                title={
                  <span>
                    <MenuFoldOutlined style={{color: color, fontSize: '13px'}}/>
                  
                  </span>
                }
                >
                  {this.getMenuNodes(item.children)}
                </SubMenu>
              )
            } else {
              return (
              
                <SubMenu
                key={item.key}
                style={{backgroundColor: color2, borderRightStyle: '1px sold black'}}
                title={
                  <span>
                    <Icon type={item.icon} />
                  </span>
                }
                >
                  {this.getMenuNodes(item.children)}
                </SubMenu>
              )  
            }

            
          }
        } else {
          return null
        }
      })
    )
  }

  handleClick = async({ item, key, keyPath, domEvent }) => {
    if(this.state.previousPage === key){
      await window.location.reload();
    } else {
      await this.props.history.push(key)
    }

    await this.setState({
      previousPage: key
    })
   
  }

  render() {
    this.title = this.props.headTitle
    const path = this.props.location.pathname.replace(/^\/trade-history[\D]+/, '/trade-history')
    var theme = storageUtils.getTheme()
    var color = ''
    var color1 = ''
    var color2 = 'rgb(225, 227, 234)'
    var color3 = 'black'
    var color6 = ''
    var color7 = ''
    if(theme === 'dark'){
      color = '#141414'
      color1 = '#c2c2c2'
      color2 = '#333'
      color3 = '#c2c2c2'
      color6 = '2px solid rgb(51, 51, 51)'
      color7 = 'rgb(51, 51, 51)'
    }

    this.menu = this.getMenuNodes(menuList, theme)
    

    var content = []
    if(theme === 'dark'){
      content.push(
          <div style={{width: '998px', height: '49px', marginTop: '11px', border: '0.105rem solid ' + color2, borderRadius: '8px'}}>
           <Menu theme="dark" onClick={this.handleClick} style={{width: '960px', marginTop: '8px', marginLeft: '15px', border: 0, backgroundColor: '#141414'}} selectedKeys={[path]} defaultOpenKeys={[this.openKey]} inlineCollapsed={false} mode="horizontal">
              {this.menu}
            </Menu>
          </div>
      )
    } else {
      content.push(
        <div style={{width: '998px', height: '49px', marginTop: '11px', border: '0.105rem solid ' + color2, borderRadius: '8px'}}>
        <Menu theme="white" onClick={this.handleClick} style={{width: '960px', marginTop: '8px', marginLeft: '15px', border: 0}} selectedKeys={[path]} defaultOpenKeys={[this.openKey]} inlineCollapsed={false} mode="horizontal">
           {this.menu}
         </Menu>
       </div>

      )
    }


    return (
      <div >
        <MediaQuery minWidth={1001}>
        <div className='Header' style={{backgroundColor: color, borderBottom: color6,boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px;'}}>
        <div className="Header-top" style={{display: 'flex', justifyContent: 'center'}} >
          
          {content}

          <div className='side-by-side' style={{position: 'relative', width: '350px', marginLeft: '10px', marginTop: '6px'}}>
          <Button style={{backgroundColor: color, color: color1, borderColor: color7, width: '140px', fontSize: '12px', marginTop: '13.5px', borderRadius: '13px'}}> 
            <p style={{fontSize: '13px', color: color3, marginTop: '5px'}}>{this.state.clock}</p>
          </Button>

          <Button onClick={this.moveFullScreen} style={{backgroundColor: color, color: color1, borderColor: color7, width: '40px', marginLeft: '10px', fontSize: '12px', marginTop: '13.5px', borderRadius: '13px'}}><FullscreenOutlined style={{color: color3}}/></Button>
          <Button onClick={this.logout} style={{backgroundColor: color, color: color1, borderColor: color7, fontSize: '12px', borderRadius: '13px'}} className="select-3"><LogoutOutlined />Exit Session</Button>
          </div>
        
        </div>
        </div>

        </MediaQuery>
        <MediaQuery maxWidth={1000} minWidth={501}>
        <div className='Header' style={{backgroundColor: color}}>
        <div className="Header-top" style={{display: 'flex', flexDirection: 'flex-end'}}>
          <div style={{width: '90%', marginLeft: '11px !important'}}>
          <MobileMenu /> 
          </div>
        
        <Button onClick={this.logout}  style={{backgroundColor: color, color: color1, borderColor: color7, width: '60px', marginTop: '15px', height: '27px', fontSize: '12px', borderRadius: '13px'}} className="select-3"><LogoutOutlined style={{marginLeft: '7px'}}/></Button>

        </div>
        </div>
        </MediaQuery>
        <MediaQuery maxWidth={500}>
          <div></div>
        </MediaQuery>
        
        
      </div>
     
        
     
    )
  }
}

export default connect(
  state => ({headTitle: state.setHeadTitle, user: state.user}),
  {logout}
)(withRouter(Header))