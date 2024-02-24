import React, { Component } from "react";
import { Form, Icon, Input, Button, message} from 'antd'
import {getUSERDATA3, listAuthyTokenAuthorization} from '../../../api/index';
import storageUtils from '../../../utils/storageUtils'
import MediaQuery from 'react-responsive'
import axios from "axios";


export class FormPersonalDetails extends Component {
  // continue = e => {
  //   e.preventDefault();
  //   this.props.nextStep();
  // };
  constructor() {
    super();

    this.state = {
      disabled: false
    };
  }

  onFinish2 = async(e) => {
    var { values } = this.props;

    var facode = values.code
    var language = await storageUtils.getLanguage()
    var cancelToken = this.source.token
    var obj = {
      'username': values.userName,
      'password': values.password
    }
    var user = await getUSERDATA3(obj, language, cancelToken)

   
    var response = await listAuthyTokenAuthorization(user, facode, language, cancelToken)
    // const key4 = `openasdaa}`;

    if(response.status === 0){
      // this.props.login(userName, password)
      // 登录成功，跳转路由 '/home'
      var match = user.data['authyTypes'].filter(obj => { return obj === 'device'})
      if(match.length > 0){
        e.preventDefault();
        this.props.nextStep();


      } else {
        this.props.props5.history.push('/login')
      }

    } else {
      message.error("Invalid code, use your generated 2FA token")
      this.props.props5.history.push('/login')
    }

    // this.checkToken(facode)
    
  };

  componentDidMount(){
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();


  }
  componentWillUnmount(){
    this.source.cancel('');

  }


  render() {
    const { handleChange } = this.props;

    return (
      <div className='login'>
        <MediaQuery minWidth={470}>
        <section className='login-split login-content1'>
        <Form  onSubmitCapture={this.onFinish2} style={{marginTop: '30%'}}  className="login-form41">
          <p style={{fontSize: '18px', marginLeft: '10%', marginTop: '4%', color: '#141414', fontWeight: '700' }}>
            Enter 2FA Token
          </p>
          <Form.Item  name="code" className="a2fa-token"  rules={[
                        {
                          required: true,
                          message: 'Please input code!',
                        },
                      ]}>
                      
                      <Input style={{width: '70%', marginLeft: '10%'}} onChange={handleChange("code")}
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      />
                      
                                     
                      </Form.Item>
                      
                      <Form.Item>
                      <Button type="primary" style={{marginLeft: '10%', marginTop: '2%', width: '170px', backgroundColor: '#0010f7', borderColor: 'white', color: 'white'}}  htmlType="submit">
                        Submit
                      </Button>
          </Form.Item>
        </Form>
        </section>
        <section className='login-split login-content2'></section>
        
        </MediaQuery>
        <MediaQuery maxWidth={469}>
        <section className='login-split login-content1'>
        <Form  onSubmitCapture={this.onFinish2} style={{marginTop: '30%'}}  className="login-form41">
          <p style={{fontSize: '18px', marginLeft: '10%', marginTop: '4%', color: '#141414', fontWeight: '700' }}>
            Enter 2FA Token
          </p>
          <Form.Item  name="code" className="a2fa-token"  rules={[
                        {
                          required: true,
                          message: 'Please input code!',
                        },
                      ]}>
                      
                      <Input style={{width: '70%', marginLeft: '10%'}} onChange={handleChange("code")}
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      />
                      
                                     
                      </Form.Item>
                      
                      <Form.Item>
                      <Button type="primary" style={{marginLeft: '10%', marginTop: '2%', width: '170px', backgroundColor: '#0010f7', borderColor: 'white', color: 'white'}}  htmlType="submit">
                        Submit
                      </Button>
          </Form.Item>
        </Form>
        </section>
        <section className='login-split login-content2'></section>
        
        </MediaQuery>
      
      
     

      </div>

      
    );
  }
}

export default FormPersonalDetails;
