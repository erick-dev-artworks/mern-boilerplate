import React, { Component } from 'react'
import {connect} from 'react-redux'
import {login, loginQR} from '../../redux/actions'
import { Form} from 'antd'
import './login.less'
import FormUserDetails from "./components/FormUserDetails";
import FormPersonalDetails from "./components/FormPersonalDetails";
import Confirm from "./components/Confirm";
import {Redirect} from 'react-router-dom'
import Login2 from './Login2';
import Login3 from './Login3';
import storageUtils from '../../utils/storageUtils';

class Login extends Component {
  state = {
    step: 1,
    userName: "",
    password: "",
    code: "",
    occupation: "",
    city: "",
    bio: ""
  };
  // Go to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  nextStep2 = () => {
    this.setState({
      step: 4
    });
  };

  nextStep3 = () => {
    this.setState({
      step: 1
    });
  };

  nextStep4 = () => {
    this.setState({
      step: 5
    })
  }

  firstStep = () => {
    this.setState({
      step: 1
    });
  };
  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  componentDidMount() {
    storageUtils.saveLanguage('ENG')
    // storageUtils.saveCurrency('USDT')
  }

  componentWillUnmount(){
    this.setState({
      step: 1,
      userName: "",
      password: "",
      code: "",
      occupation: "",
      city: "",
      bio: ""
    })
  }

  render() {
    const { step } = this.state;
    const { userName, password, code, occupation, city, bio } = this.state;
    const values = { userName, password, code, occupation, city, bio };

    if (this.props.user.y && this.props.user.x && this.props.user.z && this.props.user.c) {
      // 用户已经登录，跳转到管理页（/home）
      return <Redirect to='/home'/>
    }

    switch (step) {
      default:
        return <h1>Enable Javascript!</h1>;
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            nextStep2={this.nextStep2}
            nextStep4={this.nextStep4}
            handleChange={this.handleChange}
            props5={this.props}
            values={values}
          />
        );
      case 2:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            props5={this.props}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            props={this.props}
            values={values}
          />
        );
      case 4:
        return (
          <Login2
            props5={this.props}
            nextStep3={this.nextStep3}

          />
        );
      case 5:
        return (
          <Login3
            props5={this.props}
            values={values}
            nextStep3={this.nextStep4}
          />
        )
    }
  }
}

const WrapLogin = Form.create()(Login)

export default connect(
  state => ({user: state.user, password: state.password}),
  {login, loginQR}
)(WrapLogin)
