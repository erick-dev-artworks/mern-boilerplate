import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout, Button, Modal, notification, message} from 'antd'
import Header from '../../components/header/Header'
import LeftNav from '../../components/left-nav/LeftNav'
import NotFound from '../not-found/NotFound'
import storageUtils from '../../utils/storageUtils'
import { listUser, registerNewQRlogin, moveTokenVerify  } from '../../api/index';
import axios from "axios";
import {logout} from '../../redux/actions.js'
import HomeSelect from '../home-main/home'
import './main.less'
import jsQR from 'jsqr'

const { Content } = Layout;
const { confirm } = Modal;


class Admin extends Component {
  constructor(props) {
    super(props);
    

    
    this.intervalID = null
  }

  state = {
    visible: false,
    currency: '',
    username: '',
    pressed: 0,
    sessionInfo: [],
    modalAPI: false,
    showQRmodal2: false,
    showQRmodal: false,
    qrdata: "",
    video: null,
    ismobile: false,
    notEnabled: true,
    qrcodeinfo: '',
    fullscreen: 'off',
    clock: 'May 23, 00:00:00' ,
    showinglist: false


  }
 
  moveToken = async() => {
    try{
      var token = this.state.qrdata
      var user = await storageUtils.getUser()
      var session = await storageUtils.getId()
      var ssid1 = await storageUtils.getId1()
      var ssid2 = await storageUtils.getId2()
      var language = await storageUtils.getLanguage()
      var cancelToken = this.source.token
      var res = await moveTokenVerify(user, session, ssid1, ssid2, language, cancelToken, token)
      if(res.status === 0){
        stopStreamedVideo(this.state.video);
        function stopStreamedVideo(videoElem) {
          try{
            const stream = videoElem.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(function(track) {
              try{
                track.stop();
              } catch(e){}
              
            });
            videoElem.srcObject = null;
          } catch(e){}
         
        }
    
        this.setState({
          video: null,
          showQRmodal2: false,
          showQRmodal: true
        })
      } else {
        message.error("something went wrong, try again later")
      }
    } catch(e){ message.error(e)}
    

  }

  handleDevice = async() => {
    var token = this.state.qrdata
    var user = await storageUtils.getUser()
    var session = await storageUtils.getId()
    var ssid1 = await storageUtils.getId1()
    var ssid2 = await storageUtils.getId2()
    var language = await storageUtils.getLanguage()
    var cancelToken = this.source.token
    var res = await registerNewQRlogin(user, session, ssid1, ssid2, language, cancelToken, token)
    if(res.status === 0){
      this.setState({
        video: null,
        showQRmodal2: false,
        showQRmodal: false
      })
    } else {
      this.setState({
        video: null,
        showQRmodal2: false,
        showQRmodal: false
      })
      message.error("something went wrong, try again later")
    }

  }


  initQRC = async() => {
    try{
      const video = document.createElement('video')
      const canvasElement = document.getElementById('qrCanvas')
      const canvas = canvasElement.getContext('2d')
  
      this.setState({ video })
  
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function (stream) {
        try{
          video.srcObject = stream
          video.setAttribute('playsinline', true)
          video.play()
          requestAnimationFrame(tick)
        } catch(e){}
       
      })
  
      function drawLine(begin, end, color) {
        try{
          canvas.beginPath();
          canvas.moveTo(begin.x, begin.y);
          canvas.lineTo(end.x, end.y);
          canvas.lineWidth = 4;
          canvas.strokeStyle = color;
          canvas.stroke();
        } catch(e){

        }
        
      }
  
      const tick = async() => {
        try{
          if (this.state.notEnabled) this.setState({ notEnabled: false })
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            if (this.state.loading) this.setState({ loading: false })
            canvasElement.height = video.videoHeight
            canvasElement.width = video.videoWidth
            canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height)
            var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height)
            var code = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: 'dontInvert'
            })
            if (code) {
              drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
              drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
              drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
              drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
    
              if(this.state.qrdata.length === 0){
                await this.setState({
                  qrdata: code['data']
                })  
                await this.moveToken()
              }
                      
            }
          }
          requestAnimationFrame(tick)
        } catch(e){}
        
      }
    } catch(e){}
    
    
  }

  detectWebcam(callback) {
    let md = navigator.mediaDevices;
    if (!md || !md.enumerateDevices) return callback(false);
    md.enumerateDevices().then(devices => {
      callback(devices.some(device => 'videoinput' === device.kind));
    })
  }

  setupKeys = async() => {
    await this.props.history.push('/settings')
  }


 

  clearStorage = () => { 
    storageUtils.removeUser()
    storageUtils.removeId()
    storageUtils.removeId1()
    storageUtils.removeId2()
    storageUtils.removeNetwork()

  }
  
  saveCurrency = async(currency) => {
    storageUtils.saveCurrency(currency)
    this.setState({
      currency: currency
    })

  }

  showDrawer = () => {
    this.setState({
      visible: true
    })
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }

  handleChange = async(value) => {
    await storageUtils.saveLanguage(value)
    window.location.reload();
  }

  onChange = async(checked) => { 
    if(checked === true){
      await storageUtils.saveTheme("dark")
    } else {
      if(checked === false){
        await storageUtils.saveTheme("light")
      }
    }
    
    const current = this.props.location.pathname;
    this.props.history.replace(current);
    
  }
  recieveUser = async() => {
    var cancelToken = this.source.token
    var user = storageUtils.getUser()
    var session = storageUtils.getId()
    var ssid1 = storageUtils.getId1()
    var ssid2 = storageUtils.getId2()
    var language = storageUtils.getLanguage()
    var response = await listUser(user, session, ssid1, ssid2, language, cancelToken)
    if(response.status === 0){

      var keys = await storageUtils.getNoKeys()

      if(response.data.isapi === false & keys === undefined){
        this.showModal1()
        await storageUtils.saveNoKeys('8J29VP8xkcil1xkcilaKAJ2ilaKAJ9VPma')
      }

      if(response.data['isverified'] === false){
        var theme = storageUtils.getTheme()
        var color = '#fff'
        var color3 = 'black'
        var notifdark = ''

        if(theme === 'dark'){
          color = '#141414'
          color3 = '#c2c2c2'
          notifdark = 'notify-dark'

        }
    
      if(response.data['firsttime'] === 'false'){
        notification.error({
          className: notifdark,
          message: 'Limited account activity, API fault',
          description: (<div>
            <p style={{fontSize: '12px', color: color3}}>Your authorization keys expired.</p>
            <p style={{fontSize: '12px', color: color3}}>You are still able to use most of functions integrated</p>

            <Button onClick={this.setupKeys} style={{width: '150px', backgroundColor: color, color: color3, fontSize: '12px', marginTop: '10px'}}>Setup Keys</Button>

          </div>),
          duration: 13,
          key: 'acc-atv4',
          top: 60
        });
      }
        
      }


      this.setState({username: response.data.user})
    }

  }

  showModal1 = () => { 
    this.setState({
      modalAPI: true
    })
  }

  handleChangeAPI = () => { 
    this.setState({
      modalAPI: false
    })
  }

  changetoSetup = async() => {
    await this.props.history.push('/settings')
    this.setState({
      modalAPI: false
    })
  }

  handleCancelAPI = () => { 
    this.setState({
      modalAPI: false
    })
  }
 



  componentDidUpdate = async() => {
    var user = storageUtils.getUser()
    var network = storageUtils.getNetwork()
    var session = storageUtils.getId()
    var ssid1 = storageUtils.getId1()
    var ssid2 = storageUtils.getId2()
    var language = storageUtils.getLanguage()

    if(user === undefined || session === undefined || ssid1 === undefined || ssid2 === undefined || network === undefined || language === undefined){
      if(this.state.showinglist === false){
        this.logoutX1()
      }
    } else {
      if(user.length === 0 & session.length === 0 & ssid1.length === 0 & ssid2.length === 0 & network.length === 0){
        if(this.state.showinglist === false){
          this.logoutX1()
        }
      }
    }

    
  }

  updateClock = async() => {
    // {this.state.currentDate}

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


  componentDidMount = async() => {
    this.updateClock()

  }

  checkDATA = async() => {
    if(document.location.hash === '#/register' || document.location.hash === '#/login'){
      await this.setState({
        sessionInfo: {}
      })
      await clearInterval(this.intervalID)
    } else {
      var user = await storageUtils.getUser()
      var session = await storageUtils.getId()
      var ssid1 = await storageUtils.getId1()
      var ssid2 = await storageUtils.getId2()
      var network = await  storageUtils.getNetwork()
      var oldSession = this.state.sessionInfo

      try{
        if(user.length > 0 & session.length > 0 & ssid1.length > 0 & ssid2.length > 0){
          if(user === undefined || user === 'undefined' || network === undefined || network === 'undefined' || session === undefined || session === 'undefined' || ssid1 === undefined || ssid1 === 'undefined' || ssid2 === undefined || ssid2 === 'undefined'){
            await this.setState({
              sessionInfo: {}
            })
            await clearInterval(this.intervalID)
            await this.props.history.push('/login')
           
          } else {
            if(oldSession.length === 0){
              await storageUtils.removeId()
              await storageUtils.removeId1()
              await storageUtils.removeId2()
              await storageUtils.removeUser()
              await storageUtils.removeNetwork()


            } else {
              if(oldSession['user'] !== user){
                await storageUtils.savaUser(oldSession['user'])
              }
              if(oldSession['session'] !== session){
                await storageUtils.savaId(oldSession['session'])
              }
              if(oldSession['ssid1'] !== ssid1){
                await storageUtils.savaId1(oldSession['ssid1'])
              }
              if(oldSession['ssid2'] !== ssid2){
                await storageUtils.savaId2(oldSession['ssid2'])
              }
              if(oldSession['network'] !== network){
                await storageUtils.saveNetwork(oldSession['network'])
              }
            }
            
          }
        } else {
          await this.setState({
            sessionInfo: {}
          })
          await clearInterval(this.intervalID)
          await this.props.history.push('/login')
        }
        
      } catch(e){
        await this.setState({
          sessionInfo: {}
        })
        await clearInterval(this.intervalID)
        await this.props.history.push('/login')
      }
      
      

      
    }
  }

  cookieWatcher = async() => {
    if(this.intervalID === null){
      this.intervalID = setInterval(this.checkDATA, 3000)

    }

  }
 

  componentWillMount = async() => {
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source()

    await this.recieveUser()

    var user = await storageUtils.getUser()
    var session = await storageUtils.getId()
    var ssid1 = await storageUtils.getId1()
    var ssid2 = await storageUtils.getId2()
    var network = await storageUtils.getNetwork()

    var sessionInfo = {
      'user': user,
      'session': session,
      'ssid1': ssid1,
      'ssid2': ssid2,
      'network': network
    }

    await this.setState({
      sessionInfo: sessionInfo
    })

    if(document.location.hash !== '#/register' || document.location.hash !== '#/login'){
      this.cookieWatcher()
    } else {
      clearInterval(this.intervalID)
    }

    var canContinue = false
    var splitted = navigator.userAgent.split("(")[1].split(")")[0].split(";")
    var os = (splitted[1]).toString().replace(/\s/g, '')
    if(os !== 'Ubuntu' & os !== 'Windows' & os !== 'Macos' & os !== 'Mac OS X'){
      canContinue = true
    }

    let hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
      hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
      const mQ = matchMedia?.("(pointer:coarse)");
      if (mQ?.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
      } else if ("orientation" in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        const UA = navigator.userAgent;
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }    

    if(hasTouchScreen & canContinue === true){
      this.setState({
        ismobile: true
      })
    }


  }


  componentWillUnmount () {
    this.source.cancel('');
    this.setState({
      sessionInfo: []
      
    })
  }

  verifyClick = () => {
    this.setState({
      pressed: this.state.pressed + 1
    })

    if(this.state.pressed === 2){
      this.setState({
        pressed: 0
      })
      this.showDrawer()
    }
  }


  scanQRcode2 = async() => {
    await this.setState({
      showQRmodal2: true,
      qrdata: ''
    })
    await this.initQRC()

    
  }


  scanQRcode = () => {
    this.setState({
      showQRmodal: true
    })
  }

  hideQRmodal = () => {
    this.setState({
      showQRmodal: false
    })
  }

  hideQRmodal2 = async() => {
    
    stopStreamedVideo(this.state.video);
    function stopStreamedVideo(videoElem) {
      try{
        const stream = videoElem.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(function(track) {
          try{
            track.stop();
          } catch(e){}
        });
        videoElem.srcObject = null;
      } catch(e){}
      
    }

    await this.setState({
      video: null,
      qrdata: ''
    })

    await this.setState({
      showQRmodal2: false,
      qrdata: ''
    })
  }
  
  endSession1 = async() => {
    await this.props.logout()
  }
  
  logoutX = async() => {
    var theme = storageUtils.getTheme()
    var classB = 'exit'
    if(theme === 'dark'){
      classB = 'exit-dark'
    }

    await this.setState({
      showinglist: true
    })

    await confirm({
      content: (<div style={{justifyContent: 'center', display: 'grid'}}>
        <div className='logout-icon'></div>
        <p style={{fontSize: '12px', marginTop: '15px'}}>Are you sure to exit?</p>
      </div>),
      okText: 'Log Out',
      cancelText: 'Cancel',
      className: classB,
      onOk: async() => {
        await this.endSession1()
        await storageUtils.removeUser()
        await storageUtils.removeId()
        await storageUtils.removeId1()
        await storageUtils.removeId2() 
        await storageUtils.removeLanguage()  
        await storageUtils.deletePINSession()      
        Modal.destroyAll()
      }
    })
   
  }


  
  logoutX = async() => {
    await this.endSession1()
    await storageUtils.removeUser()
    await storageUtils.removeId()
    await storageUtils.removeId1()
    await storageUtils.removeId2() 
    await storageUtils.removeLanguage()  
    await storageUtils.deletePINSession()     
   
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



  render() {
    if (Object.entries(this.props.user).length === 0) {
      this.clearStorage()
      return <Redirect push to='/login' />
    }

    var theme = storageUtils.getTheme()
    var color = '#fff'
    var color2 = 'rgb(255, 255, 255)'
    if(theme === 'dark'){
      color = '#141414'
      color2 = 'rgb(27, 27, 27)'
    
    }
    

    return (
      <Layout  style={{minHeight: '100%'}}>
        <LeftNav/>
        <Layout className='v1' style={{backgroundColor: color2, boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px;'}}>

          <Header></Header>
          <Content style={{backgroundColor: color, margin: '9px', marginBottom: '1%', scrollbarWidth: 'none'}}>
            <Switch>
              <Redirect exact from='/' to='/home'></Redirect>
              <Route path='/home' exact component={HomeSelect}></Route>
              <Route exact component={NotFound}></Route>  
            </Switch>
          </Content>
          
        
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {logout}
)(Admin)
