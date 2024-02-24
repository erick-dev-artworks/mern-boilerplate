import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { verifyRegisterKeys } from '../../api/index'
import {login} from '../../redux/actions'
import { Form, Input, Button, message} from 'antd'
import MediaQuery from 'react-responsive'
import axios from "axios";

import './login.less'

class Login3 extends Component {
  state = {
    apiKey: '',
    secretKey: ''
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async(error) => {
      if (error) {
        // console.log(error)
      } else {
        try{ 
          var cancelToken = this.source.token
          var body2 = {
            'apiKey': this.state.apiKey,
            'secretKey': this.state.secretKey,
            'username': this.props.values.userName,
            'cancelToken': cancelToken
          }
          var verify = await verifyRegisterKeys(body2, cancelToken)

          // var verify = await verifyRegisterKeys({
          //   'apiKey': this.state.apiKey,
          //   'secretKey': this.state.secretKey,
          //   'cancelToken': cancelToken
          // })
          if(verify.status === 0){
            this.props.props5.login(this.props.values.userName, this.props.values.password);
            this.props.props5.history.replace('/home')

            
         
          } else {
            message.error("Failed to verify authorization keys")
          }
        
        } catch(e){
          if(e !== undefined){
            message.error("Server error, try again")
          }
        }
          
        
        }
      }
    )
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

  componentDidMount(){
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();

  }

  componentWillUnmount(){
    this.source.cancel('');

  }

  
  render() {
    if (this.props.user.username) {
      return <Redirect to='/login'/>
    }
    const handleClick = () => {
        this.props.nextStep3();

    //   this.props.props5.history.replace('/login')
    }

    // const errorMsg = this.props.user.errorMsg
    const {getFieldDecorator} = this.props.form
    return (
      <div className='login'>
        <MediaQuery minWidth={1351}>
        <section className='login-split login-content1'>
          <div style={{width: '90%', marginTop: '18%'}}>
          <h1 style={{fontSize: '25px', marginLeft: '24%', marginTop: '8%', color: '#141414', fontWeight: '700',  }}>Approve Binance Account</h1>
          <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif',  marginLeft: '27%', color: '#8c8c8c'}}>{"Create Account > API-Managment > Create API "}</p>
          <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif', marginLeft: '19%', color: '#8c8c8c'}}>To make sure we keep your account safe, you need to directly verify it !</p>
          
          <p style={{fontSize: '12px',  fontFamily: '"Manrope", sans-serif', marginLeft: '14%', marginTop: '5%', color: '#141414'}}>Api Key:</p>
          <Form onSubmit={this.handleSubmit} className="login-form" style={{marginTop: '10px'}}>
           
           <Form.Item>
                   {
                     getFieldDecorator('county', {
                       rules: [{required: true, message: 'Country must be provided to create your first account'}, {whitespace: true, message: 'Country should not contain white spaces'}]
                     })(
                       <Input style={{width: '70%', marginLeft: '14%'}} onChange={this.updateKey1}/>

                     )
                   }
                   
           </Form.Item>
           <p style={{fontSize: '12px',  fontFamily: '"Manrope", sans-serif', marginLeft: '14%', color: '#141414', marginTop: '10px'}}>Secret Key:</p>
           <Form.Item className="input1">
                 {
                 getFieldDecorator('phonenumber', {
                   rules: [
                     {required: true, message: 'Phone Number must be filled'}, 
                     {whitespace: true, message: 'Phone Number cannot contain spaces'}, 
                     {pattern: /^[A-Za-z_0-9]+$/, message: 'Phone Number must be composed of letters, underscores or numbers'}]
                 })(
                   <Input  style={{width: '70%', marginLeft: '14%'}} onChange={this.updateKey2}/>
               
                 )
               }
           </Form.Item>
           
           <Form.Item>
             <Button  htmlType="submit" className="login-form-button">
             Confirm
             </Button>
             <Button  className="login-form-button2"
               onClick={() => { handleClick() }}>
             Login  
             </Button>
           </Form.Item>
         </Form>  
          </div>
        
        </section>
        <section className='login-split login-content2'></section>

         
        </MediaQuery>
        <MediaQuery maxWidth={1350} minWidth={520}>
        <section className='login-split login-content1'>
          <div style={{width: '90%', marginTop: '18%'}}>
          <h1 style={{fontSize: '25px', marginLeft: '24%', marginTop: '8%',  color: '#141414', fontWeight: '700',  }}>Approve Binance Account</h1>
          <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif',  marginLeft: '27%', color: '#8c8c8c'}}>{"Create Account > API-Managment > Create API "}</p>
          <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif', marginLeft: '19%', color: '#8c8c8c'}}>To make sure we keep your account safe, you need to directly verify it !</p>
          
          <p style={{fontSize: '12px',  fontFamily: '"Manrope", sans-serif', marginLeft: '14%', marginTop: '5%', color: '#141414'}}>Api Key:</p>
          <Form onSubmit={this.handleSubmit} className="login-form" style={{marginTop: '10px'}}>
           
           <Form.Item>
                   {
                     getFieldDecorator('county', {
                       rules: [{required: true, message: 'Country must be provided to create your first account'}, {whitespace: true, message: 'Country should not contain white spaces'}]
                     })(
                       <Input style={{width: '70%', marginLeft: '14%'}} onChange={this.updateKey1}/>

                     )
                   }
                   
           </Form.Item>
           <p style={{fontSize: '12px',  fontFamily: '"Manrope", sans-serif', marginLeft: '14%', color: '#141414', marginTop: '10px'}}>Secret Key:</p>
           <Form.Item className="input1">
                 {
                 getFieldDecorator('phonenumber', {
                   rules: [
                     {required: true, message: 'Phone Number must be filled'}, 
                     {whitespace: true, message: 'Phone Number cannot contain spaces'}, 
                     {pattern: /^[A-Za-z_0-9]+$/, message: 'Phone Number must be composed of letters, underscores or numbers'}]
                 })(
                   <Input  style={{width: '70%', marginLeft: '14%'}} onChange={this.updateKey2}/>
               
                 )
               }
           </Form.Item>
           
           <Form.Item>
             <Button  htmlType="submit" className="login-form-button">
             Confirm
             </Button>
             <Button  className="login-form-button2"
               onClick={() => { handleClick() }}>
             Login  
             </Button>
           </Form.Item>
         </Form>  
          </div>
        
        </section>
        <section className='login-split login-content2'></section>

        </MediaQuery>
        <MediaQuery maxWidth={519}>
        <section className='login-split login-content1'>
          <div style={{width: '90%', marginTop: '18%'}}>
          <h1 style={{fontSize: '22px', marginLeft: '10%', marginTop: '8%', color: '#141414', fontWeight: '700',  }}>Approve Binance Account</h1>
          <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif',  marginLeft: '10%', color: '#8c8c8c'}}>{"Create Account > API-Managment > Create API "}</p>
          <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif', marginLeft: '10%', color: '#8c8c8c'}}>To make sure we keep your account safe, you need to directly verify it !</p>
          
          <p style={{fontSize: '12px',  fontFamily: '"Manrope", sans-serif', marginLeft: '10%', marginTop: '5%', color: '#141414'}}>Api Key:</p>
          <Form onSubmit={this.handleSubmit} className="login-form" style={{marginTop: '10px'}}>
           
           <Form.Item>
                   {
                     getFieldDecorator('county', {
                       rules: [{required: true, message: 'Country must be provided to create your first account'}, {whitespace: true, message: 'Country should not contain white spaces'}]
                     })(
                       <Input style={{width: '90%', marginLeft: '10%'}} onChange={this.updateKey1}/>

                     )
                   }
                   
           </Form.Item>
           <p style={{fontSize: '12px',  fontFamily: '"Manrope", sans-serif', marginLeft: '10%', color: '#141414', marginTop: '10px'}}>Secret Key:</p>
           <Form.Item className="input1">
                 {
                 getFieldDecorator('phonenumber', {
                   rules: [
                     {required: true, message: 'Phone Number must be filled'}, 
                     {whitespace: true, message: 'Phone Number cannot contain spaces'}, 
                     {pattern: /^[A-Za-z_0-9]+$/, message: 'Phone Number must be composed of letters, underscores or numbers'}]
                 })(
                   <Input  style={{width: '90%', marginLeft: '10%'}} onChange={this.updateKey2}/>
               
                 )
               }
           </Form.Item>
           
           <Form.Item>
             <Button  htmlType="submit" className="login-form-button">
             Confirm
             </Button>
             <Button  className="login-form-button2"
               onClick={() => { handleClick() }}>
             Login  
             </Button>
           </Form.Item>
         </Form>  
          </div>
        
        </section>
        <section className='login-split login-content2'></section>

        </MediaQuery>
        
      </div>
    )
  }
}
const WrapLogin = Form.create()(Login3)

export default connect(
  state => ({user: state.user, email: state.email, password: state.password}),
  {login}
)(WrapLogin)
