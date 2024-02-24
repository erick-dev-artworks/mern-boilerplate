import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setHeadTitle} from '../../redux/actions.js'
import { withRouter } from 'react-router-dom'
import { Menu, Icon} from 'antd'
import menuList from '../../config/menuConfig'
import './leftNav.less'
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive'
import storageUtils from '../../utils/storageUtils.js'
import { MenuFoldOutlined} from '@ant-design/icons';
import { listUser } from '../../api/index';
import {logout} from '../../redux/actions.js'
import axios from "axios";


// const { confirm } = Modal
const { SubMenu } = Menu;

class LeftNav extends Component {
  state = {
    collapsed: true,
    previousPage: '',
    theme: '',
    currentDefault: 'white',
    username: '',
    email: ''
  };

  getUserDATA = async() => {
    var cancelToken = this.source.token
    var user = storageUtils.getUser()
    var session = storageUtils.getId()
    var ssid1 = storageUtils.getId1()
    var ssid2 = storageUtils.getId2()
    var language = storageUtils.getLanguage()
    var response = await listUser(user, session, ssid1, ssid2, language, cancelToken)
    if(response.status === 0){
      this.setState({username: response.data.user, email: response.data.email})
    } 

  }

  hasAuth = (item) => {
    if (this.props.user) {
      return true
    } else {
      return false

    }
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  onCollapse2 = () => {
    this.setState({ collapsed: true });
  };

  updateCurr = () => {
    this.setState({
      previousPage: this.props.location.pathname
    })
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
                  <MenuFoldOutlined style={{color: color, fontSize: '13px'}}/>
                  
                  <span  style={{color: color, fontSize: '13px'}} >{item.title}</span>
                </Menu.Item>
                )
            } else {
              return (
                <Menu.Item style={{backgroundColor: color2 }}key={item.key} onClick={() => setHeadTitle(item.title)}>
                  <Icon style={{color: color, fontSize: '13px'}} type={item.icon}  />
                  <span  style={{color: color, fontSize: '13px'}} >{item.title}</span>
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
                  
                    <span>{item.title}</span>
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
                    <span>{item.title}</span>
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

  updateIcon = async() => {
    const canvas = document.querySelector('#scene2');
    if(canvas !== null){
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      // Store the 2D context
      const ctx = canvas.getContext('2d');
      var theme = await storageUtils.getTheme()
      if(theme === 'dark'){
        ctx.fillStyle = 'white';
      
      } else {
        if(theme === 'light'){
          ctx.fillStyle = 'black';

        }
      
      }

      if (window.devicePixelRatio > 1) {
        canvas.width = canvas.clientWidth * 2;
        canvas.height = canvas.clientHeight * 2;
        ctx.scale(2, 2);
      }
      
      /* ====================== */
      /* ====== VARIABLES ===== */
      /* ====================== */
      let width = canvas.clientWidth; // Width of the canvas
      let height = canvas.clientHeight; // Height of the canvas
      let rotation = 0; // Rotation of the globe
      let dots = []; // Every dots in an array
      
      /* ====================== */
      /* ====== CONSTANTS ===== */
      /* ====================== */
      /* Some of those constants may change if the user resizes their screen but I still strongly believe they belong to the Constants part of the variables */
      const DOTS_AMOUNT = 200; // Amount of dots on the screen
      const DOT_RADIUS = 2; // Radius of the dots
      let GLOBE_RADIUS = width * 0.7; // Radius of the globe
      let GLOBE_CENTER_Z = -GLOBE_RADIUS; // Z value of the globe center
      let PROJECTION_CENTER_X = width / 2; // X center of the canvas HTML
      let PROJECTION_CENTER_Y = height / 2; // Y center of the canvas HTML
      let FIELD_OF_VIEW = width * 0.8;
      
      class Dot {
        constructor(x, y, z) {
          this.x = x;
          this.y = y;
          this.z = z;
          
          this.xProject = 0;
          this.yProject = 0;
          this.sizeProjection = 0;
        }
        // Do some math to project the 3D position into the 2D canvas
        project(sin, cos) {
          const rotX = cos * this.x + sin * (this.z - GLOBE_CENTER_Z);
          const rotZ = -sin * this.x + cos * (this.z - GLOBE_CENTER_Z) + GLOBE_CENTER_Z;
          this.sizeProjection = FIELD_OF_VIEW / (FIELD_OF_VIEW - rotZ);
          this.xProject = (rotX * this.sizeProjection) + PROJECTION_CENTER_X;
          this.yProject = (this.y * this.sizeProjection) + PROJECTION_CENTER_Y;
        }
        // Draw the dot on the canvas
        draw(sin, cos) {
          this.project(sin, cos);
          // ctx.fillRect(this.xProject - DOT_RADIUS, this.yProject - DOT_RADIUS, DOT_RADIUS * 2 * this.sizeProjection, DOT_RADIUS * 2 * this.sizeProjection);
          ctx.beginPath();
          ctx.arc(this.xProject, this.yProject, DOT_RADIUS * this.sizeProjection, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        }
      }
      
      function createDots() {
        // Empty the array of dots
        dots.length = 0;
        
        // Create a new dot based on the amount needed
        for (let i = 0; i < DOTS_AMOUNT; i++) {
          const theta = Math.random() * 2 * Math.PI; // Random value between [0, 2PI]
          const phi = Math.acos((Math.random() * 2) - 1); // Random value between [-1, 1]
          
          // Calculate the [x, y, z] coordinates of the dot along the globe
          const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
          const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
          const z = (GLOBE_RADIUS * Math.cos(phi)) + GLOBE_CENTER_Z;
          dots.push(new Dot(x, y, z));
        }
      }
      
      /* ====================== */
      /* ======== RENDER ====== */
      /* ====================== */
      function render(a) {
        ctx.clearRect(0, 0, width, height);
        
        // Increase the globe rotation
        rotation = a * 0.0002;
        
        const sineRotation = Math.sin(rotation); // Sine of the rotation
        const cosineRotation = Math.cos(rotation); // Cosine of the rotation
        
        for (var i = 0; i < dots.length; i++) {
          dots[i].draw(sineRotation, cosineRotation);
        }
        
        window.requestAnimationFrame(render);
      }
      
      
      async function afterResize () {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        if (window.devicePixelRatio > 1) {
          canvas.width = canvas.clientWidth * 2;
          canvas.height = canvas.clientHeight * 2;
          ctx.scale(2, 2);
          var theme = await storageUtils.getTheme()
          if(theme === 'dark'){
            ctx.fillStyle = 'white';
          
          } else {
            if(theme === 'light'){
              ctx.fillStyle = 'black';
    
            }
          
          }
          
        } else {
          canvas.width = width;
          canvas.height = height;
        }
        GLOBE_RADIUS = width * 0.7;
        GLOBE_CENTER_Z = -GLOBE_RADIUS;
        PROJECTION_CENTER_X = width / 2;
        PROJECTION_CENTER_Y = height / 2;
        FIELD_OF_VIEW = width * 0.8;
        
        createDots(); 
      }
      
      let resizeTimeout;
      function onResize () {
        resizeTimeout = window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(afterResize, 500);
      }
      window.addEventListener('resize', onResize);
      
      createDots();
      
      window.requestAnimationFrame(render);  
    }
  }

  componentDidUpdate = async() => {
    
    var theme = await storageUtils.getTheme()
    if(this.state.currentDefault !== theme ){
      this.updateIcon()
      this.setState({currentDefault: theme})
    }
    if(this.state.collapsed === false){
      this.updateIcon()
    }
    if(this.state.collapsed === true){
      this.updateIcon()
    }

  }



  componentDidMount = async() => {
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();

    this.updateCurr()

    var theme2 = await storageUtils.getTheme()
    this.setState({currentDefault: theme2})
    this.updateIcon()

    await this.getUserDATA()

 
  }

  // endSession1 = async() => {
  //   var cancelToken = this.source.token
  //   var user = await storageUtils.getUser()
  //   var session = await storageUtils.getId()
  //   var ssid1 = await storageUtils.getId1()
  //   var ssid2 = await storageUtils.getId2()
  //   var language = await storageUtils.getLanguage()

  //   endSession(user, session, ssid1, ssid2, language, cancelToken)
  //   logoutIf({user, session, ssid1, ssid2, language, cancelToken})
  //   this.props.logout()
  // }

  // logout = () => {
  //   this.onCollapse2()
  //   confirm({
  //     content: 'Are you sure to exit?',
  //     okText: 'ok',
  //     cancelText: 'cancel',
  //     onOk: async() => {
  //       this.endSession1()
  //       await storageUtils.removeUser()
  //       await storageUtils.removeId()
  //       await storageUtils.removeId1()
  //       await storageUtils.removeId2()
  //       await storageUtils.deleteTradeBots()
  //       await storageUtils.deleteTradeBots2()
  //       await storageUtils.removeLanguage()
  //       await storageUtils.deleteBalances()
  //       await storageUtils.deleteBalancesFutures()
  //       await storageUtils.deleteTOTALBalances()
  //       await storageUtils.deleteTOTALBalancesFutures()
  //       await storageUtils.deleteTrades()
  //       await storageUtils.deleteTradesFutures()
  //       await storageUtils.deleteFULLTrades()
  //       await storageUtils.deleteFULLTradesFutures()
  //       await storageUtils.deleteOpenOrders()
  //       await storageUtils.deleteOpenOrdersFutures()
  //       await storageUtils.deleteProduct()
  //       await storageUtils.deleteTheme()
  //       await storageUtils.deleteCrypto()
  //       await storageUtils.deleteCryptoFutures()
  //       await storageUtils.deleteTech()
  //       await storageUtils.deleteNews()
  //       await storageUtils.deleteFavSymbols()
  //       await storageUtils.deletePlans()
  //     }
  //   })
  // }

  render() {
    // const path = this.props.location.pathname.replace(/^\/trade-history[\D]+/, '/trade-history')
    const { collapsed } = this.state;

    var theme = storageUtils.getTheme()
    this.menu = this.getMenuNodes(menuList, theme)
    var content = []
    // var logo = []


    // var screenWidth = document.body.clientWidth
    // var lastWidth = '22%'
    // var topX = '6%'
    // var posX = 'fixed'

    // if(screenWidth <= 1024 & screenWidth >= 452){
    //   lastWidth = '80%'
    // } else 
    // if(screenWidth <= 451){ 
    //   lastWidth = '100%'
    // }

    // if(document.body.offsetHeight <= 900){
    //   topX = '3%'
    //   posX = 'absolute'

    // } else {
    //   topX = '7%'
    // }

    var color6 = ''
    if(theme === 'dark'){
      color6 = '2px solid rgb(51, 51, 51)'
    }


    if(theme === 'dark'){
      
      if(!collapsed){
  //       content.push(
  //         <div >
  //            <Drawer className='draXwer-dark' style={{zIndex: '10001'}}  title="BITBLOCK ID" placement="left" width={lastWidth}  onClose={this.onCollapse2} visible={true}>
  //            <Card
  //   style={{ width: '100%' }}
  //   cover={
  //     <canvas style={{width: '100px', height: '100px', marginLeft: '1%'}} id="scene2"></canvas>
  //   }
  //   actions={[
  //     // <SettingOutlined key="setting" onClick={() => { this.props.history.push('user')}} />,
  //     <SettingOutlined key="setting" onClick={() => { this.props.history.push('settings')}} />,
  //     <LogoutOutlined key="logout" onClick={this.logout}/>,
  //   ]}
  // >
  //   <Meta
  //     avatar={<UserOutlined />}
  //     title={this.state.username}
  //     description={this.state.email}
  //   />
  // </Card>
  //         <div style={{width: '100%', height: '728px', overflowX: 'hidden', scrollbarWidth: 'none'}}>
  //         <Menu theme="dark" style={{backgroundColor: '#141414'}} onClick={this.handleClick} selectedKeys={[path]} defaultOpenKeys={[this.openKey]} inlineCollapsed={this.state.collapsed} mode="inline">
  //           {this.menu}
  //         </Menu>
  //         </div>
          
  //           </Drawer>
            
  //         </div>
  //       )
  //       logo.push(
  //       <div className="logo2" style={{display: 'flex', flexDirection: 'row'}}><div ><canvas id="scene2"></canvas></div><p style={{fontSize: '15px', fontWeight: 600, marginTop: '20px', marginLeft: 12, color: 'white'}}>BITBLOCK TRADING</p></div>)
      } else {
        // logo.push(<div ><div style={{marginLeft: 10, marginTop:'11px'}}><canvas id="scene2"></canvas></div></div>)
        // content.push(
        //   <Sider className='leftnav-slider-dark' style={{backgroundColor: '#141414'}} theme="dark"  collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        //     {logo}
        //     <Menu  theme="dark" onClick={this.handleClick} style={{marginTop: topX, position: posX, backgroundColor: '#141414'}} selectedKeys={[path]} defaultOpenKeys={[this.openKey]} inlineCollapsed={this.state.collapsed} mode="inline">
        //       {this.menu}
        //     </Menu>
        //   </Sider>)
    
      }


    } else {
      
      
      if(!collapsed){
  //       content.push(
  //         <div >
  //            <Drawer className='draXwer-white' style={{zIndex: '10001'}} title="BITBLOCK ID" placement="left" width={lastWidth} onClose={this.onCollapse2} visible={true}>
  //            <Card
  //   style={{ width: '100%' }}
  //   cover={
  //     <canvas style={{width: '100px', height: '100px', marginLeft: '1%'}} id="scene2"></canvas>
  //   }
  //   actions={[
  //     <SettingOutlined key="setting" onClick={() => { this.props.history.push('settings')}} />,
  //     // <SettingOutlined key="setting" onClick={() => { this.props.history.push('user')}} />,
  //     <LogoutOutlined key="logout" onClick={this.logout}/>,
  //   ]}
  // >
  //   <Meta
  //     avatar={<UserOutlined />}
  //     title={this.state.username}
  //     description={this.state.email}
  //   />
  // </Card>
  //         <div style={{width: '100%', height: '728px', overflowX: 'hidden', scrollbarWidth: 'none'}}>
  //         <Menu theme="white" onClick={this.handleClick}  selectedKeys={[path]} defaultOpenKeys={[this.openKey]} inlineCollapsed={this.state.collapsed} mode="inline">
  //           {this.menu}
  //         </Menu>
  //         </div>
          
  //           </Drawer>
            
  //         </div>
  //       )
  //       logo.push(
  //         <div style={{display: 'flex', flexDirection: 'row', marginTop: 5 }}><div><canvas id="scene2"></canvas></div><p style={{fontSize: '15px', fontWeight: 600, marginTop: '20px', marginLeft: 12, color: 'black'}}>BITBLOCK TRADING</p></div>
  //       )  
      } else {
        // logo.push(<div><div style={{marginLeft: 10, marginTop:'11px'}}><canvas id="scene2"></canvas></div></div>)

        // content.push(
        // <Sider className='leftnav-slider' theme="light"  collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        //   {logo}
        //   <Menu theme="white" onClick={this.handleClick} style={{marginTop: topX, position: 'fixed'}} selectedKeys={[path]} defaultOpenKeys={[this.openKey]} inlineCollapsed={this.state.collapsed} mode="inline">
        //     {this.menu}
        //   </Menu>
        // </Sider>)
      }
    }

    

    return (
      <div className='left-nav' style={{borderRight: color6}} >
        <MediaQuery minWidth={1000} onChange={() => {this.updateIcon()}}>
          {content}
        </MediaQuery>
        
      </div>
    )
  }
}

export default connect(
  state => ({headTitle: state.setHeadTitle, user: state.user}),
  {logout}
)(withRouter(LeftNav))

   
