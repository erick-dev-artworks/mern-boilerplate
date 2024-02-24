import React, { Component } from "react";
import MediaQuery from 'react-responsive'
import {getUSERDATA3, createAuthyDeviceAuthorization, approveAuthyDeviceAuthorization} from '../../../api/index';
import storageUtils from '../../../utils/storageUtils'
import { Form, Progress} from 'antd'
import axios from "axios";

// import {connect} from 'react-redux'
// import {login} from '../../../redux/actions'

class Confirm extends Component {
  constructor() {
    super();
    this.state = {
      percent: 0,
      uuid: '',
      id: 0,
      done: false,
      cando: 0,
      intervalId: ''
    };
  }


  recieveStatus = async() => {
    var { values } = this.props;
    var language = await storageUtils.getLanguage()
    var cancelToken = this.source.token

    var checkStatus = await approveAuthyDeviceAuthorization({'id': this.state.uuid}, language, cancelToken)
    if(checkStatus.data !== undefined){
      if(checkStatus.data.status === 'approved'){
        // console.log(this.props.props.history)
        clearInterval(this.state.intervalId)
        this.props.props.login(values.userName, values.password);
        await storageUtils.saveLanguage('ENG')
        this.setState({done: true})
        // await storageUtils.saveTheme("White")
        this.props.props.history.push('/home')
    } else {
      if(checkStatus.data.status === 'expired'){
        window.location.reload();
      }
    }
    }
    
  }

  loadDATA = async() => {
    var { values } = this.props;
    var language = await storageUtils.getLanguage()

    var obj = {
      'username': values.userName,
      'password': values.password
    }
    var cancelToken = this.source.token

    var user = await getUSERDATA3(obj, language, cancelToken)

    if(this.state.id === 0 & user.data !== undefined){
      var startData = await createAuthyDeviceAuthorization({'id': user.data['authyID']}, language, cancelToken)
      if(startData !== undefined){
        if(startData.data !== undefined){
          if(startData.data['approval_request'] !== undefined){
            this.setState({
              uuid: startData.data['approval_request']['uuid'],
              allowingState: 1
            })
          } else {
            window.location.reload();
          }
        } else {
          window.location.reload();
        }
      } else {
        window.location.reload();
      }
      this.setState({
        id: 1
      })
    }
    
  
   

    
  }

  componentDidMount() {
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();


    this.loadDATA()
    
    let myInterval = setInterval(() => {
      // var allowingState = this.state.cando
      var currentState = this.state.percent
      
        this.setState({
          percent: currentState += 1
        })
        if(this.state.done === true){
          clearInterval(myInterval)
        }
        if(this.state.percent === 100){
          clearInterval(myInterval)
          window.location.reload();
        }
        if(this.state.percent === 5 | this.state.percent === 10 | this.state.percent === 15 | this.state.percent === 20 | this.state.percent === 25 | this.state.percent === 30 | this.state.percent === 35 | this.state.percent === 50 | this.state.percent === 60 | this.state.percent === 70 | this.state.percent === 90){
          this.recieveStatus()
          
        }
      
      
    }, 2000)
    this.setState({ intervalId: myInterval})
  }

  componentWillUnmount(){
    this.source.cancel('');

  }

  
  render() {
    
    return (
      <div className='login'>
        <MediaQuery minWidth={470}>
        <section className='login-split login-content1'>
        <Form  onSubmitCapture={this.onFinish2} style={{marginTop: '30%'}}  className="login-form41">
          <p style={{fontSize: '18px', marginLeft: '19%', marginTop: '4%', color: '#141414', fontWeight: '700' }}>
            Verify your Device
          </p>
          <Form.Item  name="code" className="a2fa-token"  rules={[
                        {
                          required: true,
                          message: 'Please input code!',
                        },
                      ]}>
                      
                      <Progress type="circle" style={{marginLeft: '20%'}} percent={this.state.percent} />
                                     
                      </Form.Item>
                      
                      <Form.Item>
                      
          </Form.Item>
        </Form>
        </section>


        <section className='login-split login-content2'></section>
        

        </MediaQuery>
        <MediaQuery maxWidth={469}>
       
        <section className='login-split login-content1'>
        <Form  onSubmitCapture={this.onFinish2} style={{marginTop: '30%'}}  className="login-form41">
          <p style={{fontSize: '18px', marginLeft: '32%', marginTop: '4%', color: '#141414', fontWeight: '700' }}>
            Verify your Device
          </p>
          <Form.Item  name="code" className="a2fa-token"  rules={[
                        {
                          required: true,
                          message: 'Please input code!',
                        },
                      ]}>
                      
                      <Progress type="circle" style={{marginLeft: '35%'}} percent={this.state.percent} />
                                     
                      </Form.Item>
                      
                      <Form.Item>
                      
          </Form.Item>
        </Form>
        </section>


        <section className='login-split login-content2'></section>
        

        </MediaQuery>
        
      
      
     
    </div>

      
    );
  }
}

export default Confirm;
// const WrapLogin = Form.create()(Confirm)

// export default connect(
//   state => ({user: state.user, password: state.password}),
//   {login}
// )(WrapLogin)