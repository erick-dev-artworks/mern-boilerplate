import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { registerConfirm } from '../../../api/index'
import {register} from '../../../redux/actions'
import { Form, Icon, Input, Button, message} from 'antd'
import storageUtils from '../../../utils/storageUtils'
import MediaQuery from 'react-responsive'
import axios from "axios";

import '../register.less'

class Register2 extends Component {
  state = {
    code: ''
  }

  handleSubmit = async() => {
    try{
      var language = await storageUtils.getLanguage()
      var body = {
        'username': this.props.values.userName,
        'code': this.state.code
      }
      var cancelToken = this.source.token

      var validateToken = await registerConfirm('s11x12aAaS1DG43y52SGfgddf313pd5sfSA123Dq', body, language, cancelToken)
      if(validateToken.status === 0){

        this.props.nextStep();

      } else {
        message.error(validateToken.msg)
      }
    } catch(e){
      if(e !== undefined){
        message.error("Server error, try again")
      }
    }
  }

  setcode = (e) => {
    this.setState({
      code: e.target.value
    })

  }

  componentWillMount(){
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
   
    return (
      <div className='register'>
        <MediaQuery minWidth={730}>
         <section className='register-split register-content1'>
          <div style={{width: '100%', justifyContent: 'center', display: 'grid', marginTop: '18%'}}>
                <h1 style={{fontSize: '23px', marginTop: '8%',  color: '#141414', fontWeight: '700' }}>Verify your Email Address</h1>
                <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif', color: '#8c8c8c'}}>We sent you an email to you, please confirm its your's !</p>
            </div>
            <Input style={{width: '30%', marginLeft: '22%'}}
             prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
             placeholder="Code"
             value={this.state.code}
             onChange={this.setcode}
                     
           />
           <Button onClick={this.handleSubmit}  type="primary" style={{marginLeft: '2%', marginTop: '2%', width: '170px', backgroundColor: '#0010f7', borderColor: 'white', color: 'white'}} className="register-form-button">
             Continue
           </Button>
         </section>
         <section className='register-split register-content2'>
           
         </section>
        </MediaQuery>
        <MediaQuery maxWidth={729}>
        <section className='register-split register-content1' style={{textAlign: 'center'}}>
          <div style={{width: '90%', marginTop: '35%'}}>
              <h1 style={{fontSize: '21px', marginLeft: '10%', marginTop: '8%', color: '#141414', fontWeight: '700' }}>Verify your Email Address</h1>
              <p style={{fontSize: '10px', fontFamily: '"Manrope", sans-serif', marginLeft: '12%', color: '#8c8c8c'}}>We sent you an email to you, please confirm its your's !</p>
            </div>
            <Input style={{width: '85%'}}
             prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
             placeholder="Code"
             value={this.state.code}
             onChange={this.setcode}
                     
           />
           <Button onClick={this.handleSubmit}  type="primary" style={{ marginTop: '2%', width: '220px', backgroundColor: '#0010f7', borderColor: 'white', color: 'white'}} className="register-form-button">
             Continue
           </Button>
         </section>
         <section className='register-split register-content2'>
           
         </section>
        </MediaQuery>
      </div>
        
      
    )
  }
}
const WrapLogin = Form.create()(Register2)

export default connect(
  state => ({user: state.user, email: state.email, password: state.password}),
  {register}
)(WrapLogin)
