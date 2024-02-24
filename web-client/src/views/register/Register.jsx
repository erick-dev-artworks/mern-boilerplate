import React, { Component } from 'react'
import {connect} from 'react-redux'
import {register, login} from '../../redux/actions'
import { Form} from 'antd'
import './register.less'
import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Step4 from "./components/step4";
import {Redirect} from 'react-router-dom'

class Register1 extends Component {
  state = {
    step: 1,
    userName: "",
    userName2: "",
    password: "",
    email: "",
    country: "",
    language: "",
    phonenumber: ""
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
      step: 1
    });
  };

  firstStep = () => {
    this.setState({
      step: 1
    });
  };
  // Handle fields change
  handleChange = (name, id) => {
    // console.log(name, id)
    this.setState({ [name]: id });
  };

  render() {
    const { step } = this.state;
    const { userName, userName2, email, password, county, language, phonenumber } = this.state;
    const values = { userName, userName2, email, password, county, language, phonenumber };

    if (this.props.user._id && this.props.user.username) {
      // 用户已经登录，跳转到管理页（/home）
      return <Redirect to='/trade'/>
    }

    switch (step) {
      default:
        return <h1>Enable Javascript!</h1>;
      case 1:
        return (
          <Step1
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            props5={this.props}
            values={values}
          />
        );
      case 2: 
        return (
          <Step3
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            props5={this.props}
            values={values}
          />
        );
      case 3:
        return (
          <Step2
            nextStep={this.nextStep}
            nextStep2={this.nextStep2}

            handleChange={this.handleChange}
            props5={this.props}
            values={values}
          />
        );
      ;
      case 4: 
        return (
          <Step4
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            props5={this.props}
            values={values}

          />
        )
    
    }
  }
}

const WrapRegister = Form.create()(Register1)

export default connect(
  state => ({user: state.user, email: state.email, password: state.password, country: state.country, language: state.language, phonenumber: state.phonenumber}),
  {register, login}
)(WrapRegister)
