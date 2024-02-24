import React, { Component } from "react";
// import styles from '../login.css'
import { Form, Icon, Input, Button, message, notification, Modal} from 'antd'
import {connect} from 'react-redux'
import {login} from '../../../redux/actions'
import publicIp from 'public-ip'
import {
  getConnection,
  getUSERDATA3, 
  getRestrictions2,
  getRandomQRcode,
  verifyRandomQRcode,
  approveNewQRlogin,
  verifyPINcode2,
} from '../../../api/index';
import storageUtils from '../../../utils/storageUtils';
import 'antd/dist/antd.min.css';
import MediaQuery from 'react-responsive'
import axios from "axios";
import { LockOutlined, LoadingOutlined, UnlockOutlined} from "@ant-design/icons"
import ReactPlayer from 'react-player' 
import QRCode from 'qrcode.react';
import configURI from '../../../config-main'
import crypto from 'crypto'
// import LanguageText from '../../../locales/en-header';



class AnimatedLoader extends Component {
  state = {
    loading: false
  }

  startloading = async() => {

    setTimeout(async() => {
      this.setState({
        loading: true
      })

    }, 2000)

  }

  

  componentDidMount = async() => {
   
    await this.startloading()
  }

  render(){


    if(this.state.loading === true & this.props.existing !== true & this.props.props8 !== undefined){
      return (<FormUserDetails 
        nextStep={this.props.props8.nextStep}
        nextStep2={this.props.props8.nextStep2}
        handleChange={this.props.props8.handleChange}
        props5={this.props.props8.props5}
        values={this.props.props8.values}
        user={this.props.props8.props5.user}
        form={this.props.props8.form}
        isddone={true}

      />)
    }
    
    return <div className="page-loader">
      <div className="spinner"></div>
      <div className="txt">PAGE 1</div>
    </div>
    
  }

}

export class FormUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      uuid: '',
      id: 0,
      done: false,
      username: 'undefined',
      password: 'undefined',
      loginbuttonstatus: false,
      loadingModule: true,
      exitingComponent: false,
      defaultTheme: '',
      ontime1: true,
      show3depositqr: '',
      isExpired: false,
      loginmethod: 'simple',
      logintext: 'Login with QR Code',
      blur1: '',
      activetoken: '',
      loadingIcon: false,
      showDeviceVerify: false,
      verifyEmailCode: '',
      pinmodal: false,
      pinCodeX: '',
      pincode: '',
      cando: 0,
      intervalId: '',
      pinENABLED: false,
      passwordVisible: true
    };

    this.intervalMAIN = null
    this.intervalMAIN2 = null
    this.approveLog = null
  }


  
  setPasswordVisible = async(e) => {
    var actuallX = ''
    if(this.state.passwordVisible === false){ actuallX = true}
    if(this.state.passwordVisible === true){ actuallX = false}
    this.setState({
      passwordVisible: actuallX
    })
  }

  
  handleOkOnePIN = async() => {
    var { values } = this.props;
    var language = await storageUtils.getLanguage()
    var cancelToken = this.source.token

    var obj = {
      'username': values.userName,
      'password': values.password,
      'pincode': this.state.pinCodeX
    }
   
    var response = await verifyPINcode2(obj, language, cancelToken)
    if(response.status === 0){
      await this.setState({pinmodal: false})
      var res1c = this.props.props5.login(values.userName, values.password)
      setTimeout(() => {
        this.setState({loginbuttonstatus: false})
        this.setState({
          exitingComponent: true
        })
        
        if(res1c.status !== 'pending'){
          return this.props.props5.history.push('/home')
        }
      }, 1500)
    
    } else {
      message.error(" Invalid PIN")
      this.setState({pinmodal: false})
    }
  }

  handleCancelOnePIN = () => {
    this.setState({
      pinmodal: false
    })
  }



  pincode2 = (e) => {
    this.setState({
      pincode: e.target.value
    })
  }



  handleChange = async(value) => {
    await storageUtils.saveLanguage(value)
    window.location.reload();
  }

  completeLogIn = async(statusXC) => {
    
      var language = await storageUtils.getLanguage()
      const {userName, password} = this.props.values

      if(userName !== undefined & password !== undefined){
        if(userName.length > 0){
          if(password.length > 0){
            if(password.length > 4){
              var deviceInfo = {
                'xsc': new Buffer(userName).toString('base64'),
                'hvb': crypto.createHash('md5').update(password).digest('base64'),
                'ip': '',
                'browser': '',
                'system': '',
                'continent': '',
                'country': '',
                'countryCode': '',
                'phonecode': '',
                'networkOrg': '',
                'networkAsn': '',
                'timezone': '',
                'timezoneUTC': '',
                'date': new Date(Date.now()).toLocaleString()
              }

              var connectiondata = await getConnection(deviceInfo)
              if(connectiondata['status'] === 0){
                await storageUtils.saveNetwork(connectiondata['data']['21_vka'])

                var ip = await publicIp.v4()
                var browser = navigator.userAgent.split("(")[1].split(")")[1]
                var splitted = navigator.userAgent.split("(")[1].split(")")[0].split(";")
                var syspart1 = ''
                var syspart2 = ''
                if(splitted[1] !== undefined){ syspart1 = splitted[1]}
                if(splitted[2] !== undefined){ syspart2 = splitted[2]}
  
                var system = ''
                if(syspart1.length === 0){
                  system = syspart2
                } else {
                  if(syspart2.length === 0){
                    system = syspart1
                  } else {
                    system = syspart1 + "," + syspart2
                  }
                }
  
                var IPresponse = []
                try{
                  IPresponse = await axios.get('http://ipwho.is/' + ip)
                  if(IPresponse['status'] === 200){
                    deviceInfo['ip'] = ip
                    deviceInfo['browser'] = browser 
                    deviceInfo['system'] = system
                    deviceInfo['continent'] = IPresponse['data']['continent']
                    deviceInfo['country'] = IPresponse['data']['country']
                    deviceInfo['countryCode'] = IPresponse['data']['country_code']
                    deviceInfo['phonecode'] = IPresponse['data']['calling_code']
                    deviceInfo['networkOrg'] = IPresponse['data']['connection']['org']
                    deviceInfo['networkAsn'] = IPresponse['data']['connection']['asn']
                    deviceInfo['timezone'] = IPresponse['data']['timezone']['id']
                    deviceInfo['timezoneUTC'] = IPresponse['data']['timezone']['utc']
                  }
                } catch(e){
                  if(e !== undefined){
                    this.setState({loginbuttonstatus: false})
                    
                  }
                }
  
                
  
                var cancelToken = this.source.token
                var user = await getUSERDATA3(deviceInfo, language, cancelToken, statusXC)
                if(user.status === 3){
                  this.setState({
                    showDeviceVerify: true
                  })
                } else {
                  if(user.status === 5){
                    message.error(" no more than 5 devices is allowed")
                  } else {
                    if(user.status === 0){
                      if(user.data !== undefined){
                        if(user.data.isSuspended !== true){
                          if(user.data.isEnabled === 'true'){
                            if(user.data['pinCodeEnabled'] === true){
                              this.setState({loginbuttonstatus: false, pinmodal: true})
                            } else {
                              // this.props.props5.login(userName, password)
                              await storageUtils.saveLanguage('ENG')
                              this.setState({loginbuttonstatus: false})
                              this.setState({
                                exitingComponent: true
                              })

                              var res1c = this.props.props5.login(userName, password)
                              setTimeout(() => {
                                if(res1c.status !== 'pending'){
                                  return this.props.props5.history.push('/home')
                                }
                              }, 1500)
                            } 
                
                            
                          } else {
                            this.setState({loginbuttonstatus: false})
                            
                            this.props.nextStep2();
                          }
                        } else {
                          message.error(" Account is Suspended")
                        }
                        
                      } else {
                        this.setState({loginbuttonstatus: false})
                        message.error(" server error, please try again")
                        return this.props.props5.history.push('/login')
              
                      }
                    } else {
                      this.setState({loginbuttonstatus: false})
                      message.error(" server error, please try again")
                      return this.props.props5.history.push('/login')
                    }
                  }
                }

              } else {
                message.error(" invalid password")
                this.setState({loginbuttonstatus: false})
              }


              

              
            } else {
              message.error(" password should be atleast 4 letters long")
              this.setState({loginbuttonstatus: false})
            }

          } else {
            message.error(" password should be provided")
            this.setState({loginbuttonstatus: false})
          }
        } else {
          message.error(" username should be provided")
          this.setState({loginbuttonstatus: false})
        }
      } else {
        message.error(" please provide values")
        this.setState({loginbuttonstatus: false})
      }

    
  }


  handleSubmit = async(e) => {
    e.preventDefault()
    this.setState({loginbuttonstatus: true})

    this.props.form.validateFields(async(error, values) => {
      if (error) {
      } else {
        this.completeLogIn()
        
      
        }
      }
    )
  }


  verifyRestrictions = async() => {
    var language = await storageUtils.getLanguage()
    var cancelToken = this.source.token

    var response = await getRestrictions2(language, cancelToken)
    if(response.status === 0){
      notification.config({
        maxCount: 1,
        duration: 10,
      });

      if(response.data['login'] === true){
        notification.error({
          message: 'Login Restricted',
          description:
          <div>
            <p>We detected an issue, come back later</p>
          </div>
        });
      }
    

    }
  }

  handleClick = async() => {
    this.props.props5.history.push('/register')
    // const styles = require('../login.less');
   
  }

  handleClickXC = async() => {
    this.props.props5.history.push('/forgot-password')
    
  }

  updateCanvas = () => {
    const canvas = document.querySelector('#scene');
    if(isNaN(canvas)){
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      // Store the 2D context
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'black';
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
        // Clear the scene
        ctx.clearRect(0, 0, width, height);
        
        // Increase the globe rotation
        rotation = a * 0.0002;
        
        const sineRotation = Math.sin(rotation); // Sine of the rotation
        const cosineRotation = Math.cos(rotation); // Cosine of the rotation
        
        // Loop through the dots array and draw every dot
        for (var i = 0; i < dots.length; i++) {
          dots[i].draw(sineRotation, cosineRotation);
        }
        
        window.requestAnimationFrame(render);
      }
      
      
      // Function called after the user resized its screen
      function afterResize () {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        if (window.devicePixelRatio > 1) {
          canvas.width = canvas.clientWidth * 2;
          canvas.height = canvas.clientHeight * 2;
          ctx.scale(2, 2);
        } else {
          canvas.width = width;
          canvas.height = height;
        }
        GLOBE_RADIUS = width * 0.7;
        GLOBE_CENTER_Z = -GLOBE_RADIUS;
        PROJECTION_CENTER_X = width / 2;
        PROJECTION_CENTER_Y = height / 2;
        FIELD_OF_VIEW = width * 0.8;
        
        createDots(); // Reset all dots
      }
      
      // Variable used to store a timeout when user resized its screen
      let resizeTimeout;
      // Function called right after user resized its screen
      function onResize () {
        // Clear the timeout variable
        resizeTimeout = window.clearTimeout(resizeTimeout);
        // Store a new timeout to avoid calling afterResize for every resize event
        resizeTimeout = window.setTimeout(afterResize, 500);
      }
      window.addEventListener('resize', onResize);
      
      // Populate the dots array with random dots
      createDots();
      
      // Render the scene
      window.requestAnimationFrame(render);  
    }

  }

  componentDidUpdate = async() => {
    var theme2 = storageUtils.getTheme();
    if(theme2 !== this.state.defaultTheme){
      await this.setState({defaultTheme: theme2})

      await this.updateCanvas()
      
    }

    var documentHeight = document.body.offsetHeight
    if(this.state.documentHeight !== documentHeight){
      await this.setState({
        documentHeight: documentHeight
      })
      
    }
   
    
    var vid = document.getElementsByClassName('react-player')
    if(vid !== null & this.state.ontime1 === true){
      function reportWindowSize() {
        document.getElementsByClassName('react-player')[0].height = document.body.offsetHeight

      }

      document.body.addEventListener('resize', reportWindowSize)
      this.setState({
        ontime1: false
      })
    }
  }

  initQR = async() => {
    var newid = await getRandomQRcode()
    if(newid.status !== 1){
      this.setState({
        show3depositqr: <QRCode className='aya2' style={{marginTop: 35, width: '160px', height: '160px'}} value={newid['data']['hash']} />
      })
  
      this.intervalMAIN = setInterval(() => {
        this.setState({
          isExpired: <div style={{zIndex: '1001', position: 'absolute', marginLeft: '132px', marginTop: '90px'}}>
            <p style={{fontSize: '12px', color: 'white'}}>QR code expired</p>
            <Button style={{fontSize: '12px'}} onClick={this.refreshdata}>Refresh</Button>
          </div>
        })
        this.setState({
          blur1: 'blur(3px)',
          activetoken: ''
        })

        this.cancelboth()
      }, 60000)

      this.intervalMAIN2 = setInterval(async() => {
        if(this.state.activetoken.length > 0){
          var recieve1 = await verifyRandomQRcode(this.state.activetoken)
          
          if(recieve1.status === 0){
            if(recieve1['data']['x'] !== undefined){
              this.setState({
                isExpired: <div style={{zIndex: '1001', position: 'absolute', marginLeft: '122px', marginTop: '90px'}}>
                  <p style={{fontSize: '12px', color: 'white'}}>Processing Session</p>
                  <LoadingOutlined spin={true} style={{fontSize: '28px', color: 'white'}}/>
                </div>
                
              })
              this.setState({
                blur1: 'blur(3px)'
              })
              
              this.sendtoclear(recieve1)
              
            }
          }
        }

      }, 5000)

      this.setState({
        activetoken: newid['data']['hash']
      })
    }
  }

  cancelboth = async() => {
    clearInterval(this.intervalMAIN2)
    clearInterval(this.approveLog)
  }

  sendtoclear = async(recieve1) => {
    clearInterval(this.intervalMAIN)
    clearInterval(this.intervalMAIN2)

    this.approveLog = setInterval(async() => {
      const {userName, password} = this.props.values

      var deviceInfo = {
        'xsc': new Buffer(userName).toString('base64'),
        'hvb': crypto.createHash('md5').update(password).digest('base64'),
        'ip': '',
        'browser': '',
        'system': '',
        'continent': '',
        'country': '',
        'countryCode': '',
        'phonecode': '',
        'networkOrg': '',
        'networkAsn': '',
        'timezone': '',
        'timezoneUTC': '',
        'date': new Date(Date.now()).toLocaleString()
      }
      var connectiondata = await getConnection(deviceInfo)
      if(connectiondata['status'] === 0){
        await storageUtils.saveNetwork(connectiondata['data']['21_vka'])
        var isAproved = await approveNewQRlogin(this.state.activetoken)
        if(isAproved.status === 0){
          this.setState({
            loadingIcon: false,
            blur1: '',
            isExpired: ''
          })
          var res1c = this.props.props5.loginQR(recieve1['data']['x'], recieve1['data']['y'])
          if(res1c.status !== 'pending'){
            return this.props.props5.history.push('/home')
          }
        } else {
          this.endcycle2()
        }
      }

      
     
  
    }, 10000)
   
  }

  endcycle2 = async() => {
    clearInterval(this.approveLog)
  }

  componentWillMount = async() => {
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();

    storageUtils.saveLanguage('ENG')
   
  
   
   
  }


  refreshdata = async() => {
    await this.setState({
      blur1: '',
      isExpired: ''
    })
    await this.initQR()
  }

  componentDidMount = async() => {
    var theme2 = storageUtils.getTheme();
    

    await this.verifyRestrictions()
    var documentHeight = document.body.offsetHeight

    await this.setState({
      loadingModule: false,
      defaultTheme: theme2,
      documentHeight: documentHeight
    })

    await this.updateCanvas()

   
  }


  componentWillUnmount(){
    this.source.cancel('');

  }

  changelogin = async() => {
    if(this.state.loginmethod === 'simple'){ 
      await this.setState({loginmethod: 'qrcode', logintext: 'Basic Login'})
      await this.initQR()
      setTimeout(async() => {
        
      await this.updateCanvas()
      }, 5000);
    } else { 
      this.setState({loginmethod: 'simple', logintext: 'Login with QR Code'} )
    }
  }

  verifyCode = (e) => {
    this.setState({
      verifyEmailCode: e.target.value
    })
  }



  inputChange = (e) => {

    const inputs = document.querySelectorAll(".otp-field input");
    if(inputs !== undefined){
      inputs.forEach((input, index) => {
        input.dataset.index = index;
        input.addEventListener("paste", this.handleOnPasteOtp);
        input.addEventListener("keyup", this.handleOtp);
      });
    }

    var val = e.target.value 

    var oldpin = ""
    if(val.length === 0){
      oldpin = this.state.pinCodeX.slice(0, this.state.pinCodeX.length -1)  
    } else {
      oldpin = this.state.pinCodeX + val
    }

    this.setState({
      pinCodeX: oldpin
    })

    
  }
  
  handleOtp = (e) => {
    const inputs = document.querySelectorAll(".otp-field input");

  
    const input = e.target;
    let value = input.value;
    input.value = "";
    

    function containsOnlyNumbers(str) {
      return /^\d+$/.test(str);
    }

    var isNumber = containsOnlyNumbers(value)

    if(isNumber === true){
      input.value = value
    
      let fieldIndex = input.dataset.index;
      if (value.length > 0 && fieldIndex < inputs.length - 1) {
        input.nextElementSibling.focus();
      }
    
      if (e.key === "Backspace" && fieldIndex > 0) {
        input.previousElementSibling.focus();
      }
    
      var index2 = fieldIndex + 1

      if (index2 === inputs.length - 1) {
        this.submit();
      }
    }
   
  
    
  }

  submit = () => {
    const inputs = document.querySelectorAll(".otp-field input");

    let otp = "";
    inputs.forEach((input) => {
      otp += input.value;
      input.disabled = true;
      input.classList.add("disabled");
    });

    this.setState({
      pinCodeX: otp
    })
  }

  handleOnPasteOtp(e) {
    const inputs = document.querySelectorAll(".otp-field input");

   
    const data = e.clipboardData.getData("text");
    const value = data.split("");
    if (value.length === inputs.length) {
      inputs.forEach((input, index) => (input.value = value[index]));
      this.submit();
    }
  }
  


  render() {
    if(this.state.exitingComponent === true){
      return (<AnimatedLoader existing={true} />)
    }

    if(this.state.loadingModule === true){
      return (<AnimatedLoader />)
    }
    const { handleChange } = this.props;
    // const errorMsg = this.props.user.errorMsg
  
    this.title = this.props.headTitle
    var content = []
    

    if(document.body.offsetWidth <= 589 & document.body.offsetWidth >= 450){
      content = <div>
        <div style={{marginTop: '5%', marginLeft: '2%'}}><canvas id="scene"></canvas></div>
            <h1 style={{fontSize: '18px', marginLeft: '26%', color: '#141414', fontWeight: '700', width: 220 }} className="h2a">PAGE EXAMPLE</h1>
            <p style={{fontSize: '10px', fontFamily: 'Inter, system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'}}>Welcome back !</p>
            <Button type="primary" htmlType="submit" style={{backgroundColor: 'transparent', boxShadow: '0 0 0 0', borderColor: 'transparent'}}
              onClick={() => { this.handleClickXC() }}>
               <p style={{fontSize: '9px', fontFamily: 'Inter, system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',color: '#141414'}}>Reset Password</p>
            </Button>
            <Form onSubmit={this.handleSubmit}  className="login-form" style={{marginLeft: '10%', width: '80%'}}>
           <Form.Item className="input1">
              <Input style={{backgroundColor: 'white'}}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="ID"
                onChange={handleChange("userName")}
              />              
            </Form.Item>
            <Form.Item className="input1">
            <Input style={{backgroundColor: 'white'}}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="password"
              onChange={handleChange("password")}
              type={this.state.passwordVisible ? 'password' : 'text'}
              suffix={
                <Button type="text" onClick={this.setPasswordVisible} style={{width: '41px', padding: '0px'}}>
                  {this.state.passwordVisible ? <UnlockOutlined style={{fontSize: '11px'}}/> : <LockOutlined style={{fontSize: '11px'}}/>}
                </Button>
                
              }

            />
          </Form.Item>
          <Form.Item>
            <div className="side-by-side" style={{marginTop: '2%'}}>
            <Button type="primary" disabled={this.state.loginbuttonstatus} loading={this.state.loginbuttonstatus} htmlType="submit" style={{width: '80%', marginLeft: '10%', borderRadius: '19px', height: '35px', backgroundColor: '#0010f7', borderColor: 'white'}}>
            Continue
            </Button>
            
            </div>
            <div className="side-by-side" style={{marginTop: '10%', marginLeft: '13%'}}>
              <p style={{ fontSize: '11px', width: 150}}>Don't have an account ? </p>
              <Button type="primary" htmlType="submit" style={{backgroundColor: 'transparent', borderColor: 'transparent', boxShadow: '0 0 0 0'}}
                onClick={() => { this.handleClick() }}>
                <p style={{ fontSize: '9px', marginTop: 13.3, color: 'rgba(0, 0, 0, 0.65)' }}>CREATE ACCOUNT</p>
              </Button>
            </div>
            
            
          </Form.Item>
        </Form>
      </div>
    } else {
      if(document.body.offsetWidth <= 449){
        content = <div>
          <div style={{marginTop: '5%'}}><canvas id="scene"></canvas></div>
            <h1 style={{fontSize: '18px', marginLeft: '18%', color: '#141414', fontWeight: '700', width: 220 }} className="h2a">PAGE EXAMPLE</h1>
            <p style={{fontSize: '10px', fontFamily: 'Inter, system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'}}>Welcome back !</p>
            <Button type="primary" htmlType="submit" style={{backgroundColor: 'transparent', boxShadow: '0 0 0 0', borderColor: 'transparent'}}
              onClick={() => { this.handleClickXC() }}>
               <p style={{fontSize: '9px', fontFamily: 'Inter, system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',color: '#141414'}}>Reset Password</p>
            </Button>
            <Form onSubmit={this.handleSubmit}  className="login-form" style={{marginLeft: '10%', width: '80%'}}>
           <Form.Item className="input1">
              <Input style={{backgroundColor: 'white'}}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="ID"
                onChange={handleChange("userName")}
              />              
            </Form.Item>
            <Form.Item className="input1">
            <Input style={{backgroundColor: 'white'}}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="password"
              onChange={handleChange("password")}
              type={this.state.passwordVisible ? 'password' : 'text'}
              suffix={
                <Button type="text" onClick={this.setPasswordVisible} style={{width: '41px', padding: '0px'}}>
                  {this.state.passwordVisible ? <UnlockOutlined style={{fontSize: '11px'}}/> : <LockOutlined style={{fontSize: '11px'}}/>}
                </Button>
                
              }

            />
          </Form.Item>
          <Form.Item>
            <div className="side-by-side" style={{marginTop: '2%'}}>
            <Button type="primary" disabled={this.state.loginbuttonstatus} loading={this.state.loginbuttonstatus} htmlType="submit" style={{width: '80%', marginLeft: '10%',  borderRadius: '19px', height: '35px', backgroundColor: '#0010f7', borderColor: 'white'}}>
            Continue
            </Button>
            
            </div>
            <div className="side-by-side" style={{marginTop: '10%', marginLeft: '5%'}}>
              <p style={{ fontSize: '11px', width: 150}}>Don't have an account ? </p>
              <Button type="primary" htmlType="submit" style={{backgroundColor: 'transparent', boxShadow: '0 0 0 0', borderColor: 'transparent'}}
                onClick={() => { this.handleClick() }}>
                <p style={{ fontSize: '9px', marginTop: 13.3, color: 'rgba(0, 0, 0, 0.65)' }}>CREATE ACCOUNT</p>
              </Button>
            </div>
            
            
          </Form.Item>
        </Form>
        </div>
      } else {
        content = <div>
        <div style={{marginTop: '5%', marginLeft: '2%'}}><canvas id="scene"></canvas></div>
          <h1 style={{fontSize: '18px', marginLeft: '26%', color: '#141414', fontWeight: '700', width: 220 }} className="h2a">PAGE EXAMPLE</h1>
          <p style={{fontSize: '10px', fontFamily: 'Inter, system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'}}>Welcome back !</p>

          <Button type="primary" htmlType="submit" style={{backgroundColor: 'transparent', boxShadow: '0 0 0 0', borderColor: 'transparent'}}
              onClick={() => { this.handleClickXC() }}>
               <p style={{fontSize: '9px', fontFamily: 'Inter, system, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',color: '#141414'}}>Reset Password</p>
            </Button>
          <Form onSubmit={this.handleSubmit}  autoComplete="off" className="login-form" style={{marginLeft: '10%', width: '80%'}}>
         <Form.Item className="input1">
            <Input style={{backgroundColor: 'white'}}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="ID"
              onChange={handleChange("userName")}
            />              
          </Form.Item>
          <Form.Item className="input1">
            <Input style={{backgroundColor: 'white'}}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="password"
              onChange={handleChange("password")}
              type={this.state.passwordVisible ? 'password' : 'text'}
              autoComplete="off"
              suffix={
                <Button type="text" onClick={this.setPasswordVisible} style={{width: '41px', padding: '0px'}}>
                  {this.state.passwordVisible ? <LockOutlined style={{fontSize: '11px'}}/> : <UnlockOutlined style={{fontSize: '11px'}}/>}
                </Button>
                
              }

            />
          </Form.Item>
        <Form.Item>
          <div className="side-by-side" style={{marginTop: '2%'}}>
          <Button type="primary" disabled={this.state.loginbuttonstatus} loading={this.state.loginbuttonstatus} htmlType="submit" style={{width: '80%',  borderRadius: '19px', height: '35px', marginLeft: '10%', backgroundColor: '#0010f7', borderColor: 'white'}}>
          Continue
          </Button>
          
          </div>
          <div className="side-by-side" style={{marginTop: '10%', marginLeft: '13%'}}>
            <p style={{ fontSize: '11px', width: 150}}>Don't have an account ? </p>
            <Button type="primary" htmlType="submit" style={{backgroundColor: 'transparent', boxShadow: '0 0 0 0', borderColor: 'transparent'}}
              onClick={() => { this.handleClick() }}>
              <p style={{ fontSize: '9px', marginTop: 13.3, color: 'rgba(0, 0, 0, 0.65)' }}>CREATE ACCOUNT</p>
            </Button>
          </div>
          
          
        </Form.Item>
        </Form>
          </div>
      }
    }

    if(this.props.isddone !== undefined){
      if(this.props.isddone === true ){
        return (
          <div className="login" style={{overflow: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', overflowY: 'scroll'}}>
          <MediaQuery minWidth={943} onChange={async() => { await this.updateCanvas()}}>
            <ReactPlayer className="react-player" width="100%" controls={false} muted={true} height="100%" playing={true} loop={true} url={configURI['fileUploadURI'] + '/upload/watermelone.mp4'} />


            <section className='login-split login-content1' style={{overflow: 'hidden', msOverflowStyle: 'none', scrollbarWidth: 'none', overflowY: 'scroll'}}>
              <div style={{width: '450px', height: 450, marginTop: '20%', textAlign: 'center'}}>
                <Button style={{color: 'black', fontSize: '11px'}} onClick={this.changelogin}>{this.state.logintext}</Button>
                <p style={{color: 'black', fontSize: '11px', marginTop: '2%'}}>Confirm you are using the official site</p>
                <div className="side-by-side">
                  <LockOutlined style={{fontSize: '11px', marginLeft: '35%', color: 'green', marginTop: '4px'}}/>
                  <p style={{fontSize: '12px', marginLeft: '10px'}}>http://domain.com</p>
                </div>
                {content}
              </div>
              
            </section>
            
          
          </MediaQuery>
          
          <MediaQuery maxWidth={942} minWidth={590} onChange={async() => { await this.updateCanvas()}}>
            <section className='login-split login-content1'>
              <div style={{width: '450px', height: 450, marginTop: '20%', textAlign: 'center'}}>
                <Button style={{color: 'black', fontSize: '11px'}} onClick={this.changelogin}>{this.state.logintext}</Button>
                <p style={{color: 'black', fontSize: '11px'}}>Confirm you are using the official site</p>
                <div className="side-by-side">
                  <LockOutlined style={{fontSize: '11px', marginLeft: '35%', color: 'green', marginTop: '4px'}}/>
                  <p style={{fontSize: '12px', marginLeft: '10px'}}>http://domain.com</p>
                </div>
                {content}
              </div>
            </section>
          

          
          </MediaQuery>
          <MediaQuery maxWidth={589} minWidth={450} onChange={async() => { await this.updateCanvas()}}>
            <section className='login-split login-content1'>
              <div style={{width: '450px', height: 450, marginTop: '20%', textAlign: 'center'}}>
                <Button style={{color: 'black', fontSize: '11px'}} onClick={this.changelogin}>{this.state.logintext}</Button>
                <p style={{color: 'black', fontSize: '11px'}}>Confirm you are using the official site</p>
                <div className="side-by-side">
                  <LockOutlined style={{fontSize: '11px', marginLeft: '35%', color: 'green', marginTop: '4px'}}/>
                  <p style={{fontSize: '12px', marginLeft: '10px'}}>http://domain.com</p>
                </div>
                {content}
              </div>
            </section>

          
          </MediaQuery>
          <MediaQuery maxWidth={449} onChange={async() => { await this.updateCanvas()}}>
            


            <section className='login-split login-content1'>
              <div style={{width: '350px', height: 450, marginTop: '18%', textAlign: 'center'}}>
                <Button style={{color: 'black', fontSize: '11px'}} onClick={this.changelogin}>{this.state.logintext}</Button>
                <p style={{color: 'black', fontSize: '11px', marginTop: '3%'}}>Confirm you are using the official site</p>
                <div className="side-by-side">
                  <LockOutlined style={{fontSize: '11px', marginLeft: '32%', color: 'green', marginTop: '4px'}}/>
                  <p style={{fontSize: '12px', marginLeft: '10px'}}>http://domain.com</p>
                </div>
                {content}
              </div>
            </section>

          
          </MediaQuery>
          <Modal className="sc291cx" title="Verify PIN Code" destroyOnClose={true}  style={{textAlign: 'center', marginTop: '10%'}} visible={this.state.pinmodal}  onOk={this.handleOkOnePIN}  onCancel={this.handleCancelOnePIN}>
          
          <div style={{height: '70px'}}>
            <div className="otp-field" style={{marginTop: '7%'}}>
              <input type="text" maxLength="1" onChange={this.inputChange} />
              <input type="text" maxLength="1" onChange={this.inputChange} />
              <input type="text" maxLength="1" onChange={this.inputChange} />
              <input type="text" maxLength="1" onChange={this.inputChange} />
              <input type="text" maxLength="1" onChange={this.inputChange} />
              <input type="text" maxLength="1" onChange={this.inputChange} />
              <input type="text" maxLength="1" onChange={this.inputChange} />
            </div>
          </div>
          </Modal>
        </div>
    
    
        
        );
      }
    } else {
      return (<AnimatedLoader props8={this.props}/>)
     
    }
    
    
  }
}

const WrapLogin = Form.create()(FormUserDetails)

export default connect(
  state => ({user: state.user, password: state.password}),
  {login}
)(WrapLogin)