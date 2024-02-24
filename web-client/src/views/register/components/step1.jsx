import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register, login} from '../../../redux/actions'
import storageUtils from '../../../utils/storageUtils';
import { Form, Icon, Input, Button, notification, message} from 'antd'
import {getRestrictions2, verifyRegister, getDefaultNetwork} from '../../../api/index'
import MediaQuery from 'react-responsive'
import axios from "axios";
import { LockOutlined } from "@ant-design/icons"
import ReactPlayer from 'react-player' 

import '../register.less'


class AnimatedLoader extends Component {
  state = {
    loading: false
  }

  startloading = async() => {

    setTimeout(() => {
      this.setState({
        loading: true
      })

    }, 3000)

  }

  componentDidMount = async() => {
   
    await this.startloading()
  }

 

  render(){


    if(this.state.loading === true & this.props.existing !== true){
      return (<Register1 
        nextStep={this.props.props8.nextStep}
        handleChange={this.props.props8.handleChange}
        props5={this.props.props8.props5}
        user={this.props.props8.props5.user}
        form={this.props.props8.form}
        values={this.props.props8.values}
        isddone={true}

      />)
    }
    
    return <div className="page-loader">
      <div className="spinner"></div>
      <div className="txt">PAGE 1</div>
    </div>

  }

}

export class Register1 extends Component {
  constructor(props) {
    super(props);
    this.intervalNull = null
    
  }
  state = {
    registerbuttonstatus: false,
    loadingModule: true,
    ontime1: true,
    canRegister: false,
    chaptha: [],
    modalAPI: false,
    modalAPI2: true,
    chapthaword: '',
    textCode: ''
  }

  
  changeText = (e) => {
    this.setState({
      textCode: e.target.value
    })
  }
  createMarkup(source) {
    return { __html: source };
  }

  MyCaptcha = () => {
    var image = this.state.chaptha
    if (image === null)
      return <p>Please click to generate a new captcha image.</p>;
    return <div dangerouslySetInnerHTML={this.createMarkup(image)} />;
  }
  
  regenerateCanvas = () => {
    this.props.form.validateFields(async(error, values) => {
      if (error) {
        this.setState({
          registerbuttonstatus: false
        })
      } else {
        const {userName, email, password,} = values

        if(userName.length > 0 & email.length > 0 & password.length > 0){
          if(this.intervalNull !== null){
            clearInterval(this.intervalNull)
          }
          this.setState({
            registerbuttonstatus: true
          })
          this.props.form.validateFields(async(error, values) => {
            if (error) {
              this.setState({
                registerbuttonstatus: false
              })
            } else {
                const {userName, email, password} = values
                const { handleChange } = this.props;
      
                if(this.state.canRegister === true){
                  var token2 = 'amk141mk141mk14mk14171mk141sd2k3mk1411@$!'
                  var verifyUser = await verifyRegister(userName, email, token2)
                  if(verifyUser['status'] === 0){
                    handleChange("email", email)
                    handleChange("userName", userName)
                    handleChange("password", password)
                    this.setState({
                      registerbuttonstatus: false
                    })
                    this.props.nextStep()
                  } else {
                    message.error(" email or username is already registered")
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000)
                   
                  } 
                }
              }
            }
          )
      
        } else {
          message.error(" you must fill all the fields", 1)
        }
      }
    })

  }

  handleSubmit = async(e) => {
    e.preventDefault()
    if(this.intervalNull !== null){
      clearInterval(this.intervalNull)
    }

    this.regenerateCanvas()

    this.intervalNull = setInterval(() => {
      if(this.state.modalAPI === false & this.state.modalAPI2 === true){
        this.regenerateCanvas()
      } else {
        if(this.state.modalAPI === true & this.state.modalAPI2 === false){
          this.regenerateCanvas()
        } else {
          clearInterval(this.intervalNull)
        }
       
      }
      
    }, 15000)

  }

  handleCancelAPI = () => {
    this.setState({
      modalAPI: false,
      modalAPI2: true
    })
    if(this.intervalNull !== null){
      clearInterval(this.intervalNull)
    }
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

      if(response.data['register'] === true){
        notification.error({
          message: 'Register Restricted',
          description:
          <div>
            <p>We detected an issue, come back later</p>
          </div>
        });
      }
    

    }
  }


  getDefaultNetwork2 = async() => {
    try{
    var theme = storageUtils.getTheme()
    var color = '#fff'
    var color3 = 'black'

    if(theme === 'dark'){
      color = '#141414'
      color3 = '#c2c2c2'
    }
    
    
    var connectiondata = await getDefaultNetwork()
    if(connectiondata['status'] === 0){
      await storageUtils.saveNetwork(connectiondata['data']['21_vka'])
      this.setState({
        canRegister: true
      })
    } else {
      notification.error({
        message: 'Network error - peers not available',
        description: (<div>
          <p style={{fontSize: '12px', color: color3}}>clear browser and try again to fetch new peer list</p>
          <p style={{fontSize: '12px', color: color3}}></p>

          <Button onClick={this.setupKeys} style={{width: '150px', backgroundColor: color, color: color3, fontSize: '12px', marginTop: '10px'}}>Setup Keys</Button>

        </div>),
        duration: 13,
        key: 'acc-atv4',
        top: 60
      }); 
    }
    
    } catch(e){
      if(e !== undefined){
            if (e instanceof TypeError) {
              this.setState({
                hasErrorFunctional: true,
                errorMesasageFunctional: e.message
              });
            } else if (e instanceof RangeError) {
              this.setState({
                hasErrorFunctional: true,
                errorMesasageFunctional:  e.message
              });
            } else if (e instanceof EvalError) {
              this.setState({
                hasErrorFunctional: true,
                errorMesasageFunctional:  e.message
              });
            } else {
              this.setState({
                hasErrorFunctional: true,
                errorMesasageFunctional:  e.message
              });
            }
    
            
        
          }
    }

  }

  componentWillMount = async() => {
    await this.getDefaultNetwork2()
    await this.verifyRestrictions()
    
  }

  

  componentDidMount(){
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();

    this.setState({
      loadingModule: false
    })
  }

  componentDidUpdate(){

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

  componentWillUnmount(){
    this.source.cancel('');
  }




  render() {
    if(this.state.loadingModule === true){
      return (<AnimatedLoader/>)
    }
    if (this.props.user.username) {
      return <Redirect to='/login'/>
    }
    const handleClick = () => {
      this.props.props5.history.replace('/login')
    }

    // const errorMsg = this.props.user.errorMsg
    const {getFieldDecorator} = this.props.form
    if(this.props.isddone !== undefined){
      if(this.props.isddone === true ){
        return (
          <div  className='register'>
           
            <MediaQuery minWidth={572}>
            <ReactPlayer className="react-player" width="100%" controls={false} muted={true} height={this.state.documentHeight} playing={true} loop={true} url='/images/watermelone.mp4' />

            <section className='register-split register-content1'>
              <div style={{width: '100%', marginTop: '18%', textAlign: 'center'}}>
                <p style={{color: 'black', fontSize: '11px', marginLeft: '4%'}}>Confirm you are using the official site</p>
                <div className="side-by-side">
                  <LockOutlined style={{fontSize: '11px', marginLeft: '44%', color: 'green'}}/>
                  <p style={{fontSize: '12px', marginLeft: '10px'}}>http://domain.com</p>
                </div>
                <h1 style={{fontSize: '25px', marginTop: '2%', marginLeft: '4%', color: '#141414', fontWeight: '700' }}>Create Account</h1>
                
                <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif', marginLeft: '5%', color: '#8c8c8c'}}>Enjoy your jorney with community !</p>
              </div>
              <Form onSubmit={this.handleSubmit} style={{marginTop: '20px', width: '100%', display: 'grid', justifyContent: 'center'}}>
                    <p style={{fontSize: '12px', marginLeft: '7%'}}>E-mail</p>
                    <Form.Item>
                      {
                        getFieldDecorator('email', {
                          rules: [{required: true, message: 'Email must be provided to create your first account'}, {whitespace: true, message: 'Email should not contain white spaces'}]
                        })(
                          <Input style={{width: '100%', marginLeft: '5%'}}
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0, .25)'}}/>}
                            placeholder=""
                            type="email"
                          />
                        )
                      }
                      
                    </Form.Item>
                    <p style={{fontSize: '12px', marginLeft: '7%'}}>ACCOUNT</p>
                    <Form.Item>
                      {
                        getFieldDecorator('userName', {
                          rules: [
                            {max: 12, message: 'Username is limited to 12 symbols, please choose wisely'},
                            {min: 4, message: 'Username minimal length is limited to 4 symbols'},
                            {required: true, message: 'Username must be filled to create your first account'},
                            {whitespace: true, message: 'Username should not contain white spaces'}
                          ]
                        })(
                          <Input autoComplete="new-userName" style={{width: '100%', marginLeft: '5%'}}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}}/>}
                          />
                        )
                      }
                    </Form.Item>
                    <p style={{fontSize: '12px', marginLeft: '5%', width: '100%', marginTop: '7px'}}>Your name will become your BITBLOCKid, which you’ll use to log into bitblock.live.</p>
                    <p style={{fontSize: '12px', marginLeft: '7%'}}>Password</p>
                    <Form.Item className="input1" >
                    {
                    getFieldDecorator('password', {
                      rules: [
                        {max: 20, message: 'Password up to 20 digits'}, 
                        {min: 4, message: 'Password at least 4 digits'}, 
                        {required: true, message: 'Password must be filled'}, 
                        {whitespace: true, message: 'Password cannot contain spaces'}, 
                        {pattern: /^[A-Za-z_0-9]+$/, message: 'Password must be composed of letters, underscores or numbers'}]
                    })(
                      <Input.Password autoComplete="new-password" style={{width: '100%', marginLeft: '5%'}}  
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
    
                      />
                    )
                  }
                  </Form.Item>
                 

                 <div  style={{marginTop: '10px', display: 'grid', marginLeft: '15%', justifyContent: 'center'}}>
                 
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <p style={{fontSize: '12px', marginTop: 15}}>Already have a Account ?</p>
                    <button style={{border: 'none', backgroundColor: 'inherit', marginTop: 3.1, marginLeft: 7, fontSize: '12px', cursor: 'pointer', display: 'inline-block'}} onClick={() => { handleClick() }}>Log In</button>
                  </div>
                  <Button disabled={this.state.registerbuttonstatus} loading={this.state.registerbuttonstatus}  style={{width: '250px', marginTop: 5,borderRadius: '19px', height: '35px',  backgroundColor: '#0010f7', borderColor: 'white', color: 'white'}} htmlType="submit" className="register-form-button">
                    Continue
                  </Button>
                 </div>
                 
                  </Form>
            </section>
            <section className='register-split register-content2'>
              
            </section>
            
          
            </MediaQuery>
            <MediaQuery maxWidth={571}>

           <section className='register-split register-content1' style={{textAlign: 'center', justifyContent: 'center', display: 'grid'}}>
              <div style={{width: '370px', marginTop: '17%', textAlign: 'center'}}>
                <p style={{color: 'black', fontSize: '11px'}}>Confirm you are using the official site</p>
                <div className="side-by-side">
                  <LockOutlined style={{fontSize: '11px', marginLeft: '32%', color: 'green'}}/>
                  <p style={{fontSize: '12px', marginLeft: '10px'}}>http://domain.com</p>
                </div>
                <h1 style={{fontSize: '25px', marginTop: '2%',  color: '#141414', fontWeight: '700' }}>Create Account</h1>
                <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif',  color: '#8c8c8c'}}>Enjoy your jorney with community !</p>
                  
              </div>
              <Form onSubmit={this.handleSubmit} style={{marginTop: '20px', width: '100%'}}>
                    <p style={{fontSize: '12px', marginRight: '69%'}}>E-mail</p>
                    <Form.Item>
                      {
                        getFieldDecorator('email', {
                          rules: [{required: true, message: 'Email must be provided to create your first account'}, {whitespace: true, message: 'Email should not contain white spaces'}]
                        })(
                          <Input style={{width: '85%'}}
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0, .25)'}}/>}
                            placeholder=""
                            type="email"
                          />
                        )
                      }
                      
                    </Form.Item>
                    <p style={{fontSize: '12px', marginRight: '69%'}}>ACCOUNT</p>
                    <Form.Item>
                      {
                        getFieldDecorator('userName', {
                          rules: [
                            {max: 12, message: 'Username is limited to 12 symbols, please choose wisely'},
                            {min: 4, message: 'Username minimal length is limited to 4 symbols'},
                            {required: true, message: 'Username must be filled to create your first account'},
                            {whitespace: true, message: 'Username should not contain white spaces'}
                          ]
                        })(
                          <Input style={{width: '85%'}}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}}/>}
                          />
                        )
                      }
                    </Form.Item>
                     <p style={{fontSize: '12px', marginRight: '67%'}}>Password</p>
                    <Form.Item className="input1">
                    {
                    getFieldDecorator('password', {
                      rules: [
                        {max: 20, message: 'Password up to 20 digits'}, 
                        {min: 4, message: 'Password at least 4 digits'}, 
                        {required: true, message: 'Password must be filled'}, 
                        {whitespace: true, message: 'Password cannot contain spaces'}, 
                        {pattern: /^[A-Za-z_0-9]+$/, message: 'Password must be composed of letters, underscores or numbers'}]
                    })(
                      <Input style={{width: '85%'}}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        autoComplete="new-password"
                      />
                    )
                  }
                </Form.Item>
                 
               
                  <div style={{marginTop: '10px'}}>
                  <Button disabled={this.state.registerbuttonstatus} loading={this.state.registerbuttonstatus}  style={{width: '220px',borderRadius: '19px', height: '35px', marginTop: 5, backgroundColor: '#0010f7', borderColor: 'white', color: 'white'}} htmlType="submit" className="register-form-button">
                  Continue
                  </Button>
                  </div>

                 <div style={{marginTop: '10px'}}>
                
                 <div style={{display: 'flex', flexDirection: 'row', marginLeft: '25%'}}>
                    <p style={{fontSize: '12px', marginTop: 15}}>Already have a Account ?</p>
                    <button style={{border: 'none', backgroundColor: 'inherit',  marginTop: 4, marginLeft:15, fontSize: '12px', cursor: 'pointer', display: 'inline-block'}} onClick={() => { handleClick() }}>Log In</button>
                  </div>
                 </div>
                  
                  </Form>
            </section>
           
          
            </MediaQuery>
          </div>
          
        )
      }
    } else {
      return (<AnimatedLoader props8={this.props}/>)
    }
    
  }
}
const WrapLogin = Form.create()(Register1)

export default connect(
  state => ({user: state.user, email: state.email, password: state.password, county: state.county, language: state.language, phonenumber: state.phonenumber  }),
  {register, login}
)(WrapLogin)
