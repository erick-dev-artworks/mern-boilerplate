import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { registerConfirm } from '../../api/index'
import {login} from '../../redux/actions'
import { Form, Icon, Input, Button, message} from 'antd'
import storageUtils from '../../utils/storageUtils'
import MediaQuery from 'react-responsive'
import axios from "axios";

import './login.less'

class Login2 extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async(error, values) => {
      if (error) {
        // console.log(error)
      } else {
        try{
          const {userName2} = values
          
          var body = {
            'username': this.props.values.userName,
            'code': userName2
          }
          var cancelToken = this.source.token
          var validateToken = await registerConfirm('s11x12aAaS1DG43y52SGfgddf313pd5sfSA123Dq', body, cancelToken)
          if(validateToken.status === 0){
            this.props.props5.login(this.props.values.userName, this.props.values.password);
            await storageUtils.saveLanguage('ENG')
            // await storageUtils.saveTheme("White")
            this.props.props5.history.replace('/home')

          } else {
            message.error(validateToken.msg)
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
        <MediaQuery minWidth={470}>
        <section className='login-split login-content1'>
            <div style={{width: '75%', marginTop: '27%', textAlign: 'center' }} >
              <h1 style={{fontSize: '16px', marginLeft: '10%', marginTop: '4%', color: '#141414', fontWeight: '700' }} className="h2a">Confirm your Email Address</h1>
              <Form onSubmit={this.handleSubmit} className="login-form" style={{marginTop: '5%'}}>
        
        <Form.Item className="input1">
          {
            getFieldDecorator('userName2', {
              rules: [{max: 8, message: 'Code should be 8 digits long'}, {min: 4, message: 'Code at least 4 digits'}, {required: true, message: 'Code must be filled in'}, {whitespace: true, message: 'Code cannot contain spaces'}],
            })(
              <Input  style={{width: '70%', marginLeft: '10%'}}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Code"
                
              />
            )
          }                
        </Form.Item>
        
        <Form.Item>
          <Button htmlType="submit" style={{marginLeft: '10%', marginTop: '2%', width: '150px'}}>
          Confirm
          </Button>
          <Button style={{marginLeft: '10px', marginTop: '2%', width: '150px'}} 
            onClick={() => { handleClick() }}>
          Return 
          </Button>
        </Form.Item>
      </Form>


            </div>

           
          </section>
          <section className='login-split login-content2'></section>

        

        </MediaQuery>
        <MediaQuery maxWidth={469} >
        <section className='login-split login-content1'>
            <div style={{width: '100%', marginTop: '50%', textAlign: 'center' }} >
              <h1 style={{fontSize: '16px', marginTop: '4%', color: '#141414', fontWeight: '700' }} className="h2a">Confirm your Email Address</h1>
              <Form onSubmit={this.handleSubmit} className="login-form" style={{marginTop: '5%'}}>
        
        <Form.Item className="input1">
          {
            getFieldDecorator('userName2', {
              rules: [{max: 8, message: 'Code should be 8 digits long'}, {min: 4, message: 'Code at least 4 digits'}, {required: true, message: 'Code must be filled in'}, {whitespace: true, message: 'Code cannot contain spaces'}],
            })(
              <Input  style={{width: '70%'}}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Code"
                
              />
            )
          }                
        </Form.Item>
        
        <Form.Item>
          <Button htmlType="submit" style={{ marginTop: '8%', width: '150px'}}>
          Confirm
          </Button>
          <Button style={{marginLeft: '10px', marginTop: '2%', width: '150px'}} 
            onClick={() => { handleClick() }}>
          Return 
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
const WrapLogin = Form.create()(Login2)

export default connect(
  state => ({user: state.user, email: state.email, password: state.password}),
  {login}
)(WrapLogin)
