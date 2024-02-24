import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../redux/actions'
import { Form, Icon, Input, Button} from 'antd'
import './register.less'

class Register extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((error, values) => {
      if (error) {
        console.log(error)
      } else {
          const {userName, email, password} = values
          this.props.register(userName, email, password)
          this.props.history.replace('/login')
        }
      }
    )
  }
  render() {
    if (this.props.user.username) {
      return <Redirect to='/login'/>
    }
    const handleClick = () => {
      this.props.history.replace('/login')
    }

    const errorMsg = this.props.user.errorMsg
    const {getFieldDecorator} = this.props.form
    return (
      <div className='register'>
        <header className='register-header'>
          <img src="/images/logo.png" alt=''/>
          <h1>Share Holding Indelible Technology</h1>
        </header>
        <section className='register-content'>
          <div className={errorMsg ? 'error-msg show' : 'error-msg'}>{errorMsg}</div>
          <img className="logo2" src="/images/logo.png" alt=''/>
          <h2 className="logo-header">Choose your subscription type</h2>
          <Form onSubmit={this.handleSubmit} className="register-form">
            <Form.Item>
              {
                getFieldDecorator('userName', {
                  rules: [{max: 12, message: 'Username up to 12 digits'}, {min: 4, message: 'Username at least 4 digits'}, {required: true, message: 'Username must be filled in'}, {whitespace: true, message: 'Username cannot contain spaces'}],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="ID"
                    
                  />
                )
              }                
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('email', {
                  rules: [{required: true, message: 'Email must be filled in'}, {whitespace: true, message: 'Email cannot contain spaces'}],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="email"
                    type="email"
                  />
                )
              }                
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [{max: 20, message: 'Password up to 20 digits'}, {min: 4, message: 'Password at least 4 digits'}, {required: true, message: 'Password must be filled'}, {whitespace: true, message: 'Password cannot contain spaces'}, {pattern: /^[A-Za-z_0-9]+$/, message: 'Password must be composed of letters, underscores or numbers'}]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="password"

                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="register-form-button">
              Register
              </Button>
              <Button type="primary" htmlType="submit" className="register-form-button2"
                onClick={() => { handleClick() }}>
              Log In  
              </Button>
            </Form.Item>
          </Form>
          
        </section>
      </div>
    )
  }
}
const WrapLogin = Form.create()(Register)

export default connect(
  state => ({user: state.user, email: state.email, password: state.password}),
  {}
)(WrapLogin)
