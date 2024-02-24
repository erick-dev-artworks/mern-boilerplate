import React, { Component } from 'react'
import { Input, Button, message, Icon, Select } from 'antd'
import { createForgotModal, verifycode1, verifypwtoken2, verifypwtoken2x, verifycodeX, verifycodeX2, resetPasswordLink, verifypwtoken, createForgotModal2, createForgotModal2x } from '../../api'
import storageUtils from '../../utils/storageUtils';
import axios from 'axios';
import './forgot.less';

const Option = Select.Option

export default class Forgot extends Component {
    constructor(props){
        super(props)

        this.state = {
            emailAddress: '',
            recievedID: '',
            contenttype: 4,
            password: '',
            password2: '',
            username: '',
            verifyx: '',
            recoverMethod: ''

        }

    }
  
    validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


    emailNotification = (e) => {
        this.setState({
            emailAddress: e.target.value
        })

    }

    componentDidMount = () => {
        document.title = "Reset Password"
    }

    componentWillMount = async() => {
        const CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
        var cancelToken = this.source.token

        var link = document.location.href.split('forgot-password/')
        if(link.length > 0){
            if(link[1] !== undefined){
                var sliceX = link[1].slice(0, 6)

                if(sliceX === '01xcnV'){
                    var id = link[1]
                    
        
                    var resE = await verifycodeX(id, cancelToken)
                    if(resE.status === 0){
                        if(resE.data['status'] === 0){
                            this.setState({
                                contenttype: 6,
                                recievedID: id
                            })
                        } else {
                            var splitc7 = document.location.href.split('/')
                            if(splitc7.length !== 5){
                                this.props.history.push('/login')
                            }
                        }
                    } else {
                        if(resE.status === 2){
                            message.error(" you are able to change 2FA once in 24 hours")
                            setTimeout(() => { 
                                this.props.history.push('/login')
                            }, 3000)
                        } else {
                            var splitcX = document.location.href.split('/')
                            if(splitcX.length !== 5){
                                this.props.history.push('/login')
                            }
                        }
                    }

                } else {
                    if(sliceX === '01VcnG'){
                        var idC = link[1]
            
                        var resEX = await verifycodeX2(idC, cancelToken)
                        if(resEX.status === 0){
                            if(resEX.data['status'] === 0){
                                this.setState({
                                    contenttype: 8,
                                    recievedID: idC
                                })
                            } else {
                                var splitc = document.location.href.split('/')
                                if(splitc.length !== 5){
                                    this.props.history.push('/login')
                                }
                            }
                        } else {
                            if(resEX.status === 2){
                                message.error(" you are able to change PIN once in 24 hours")
                                setTimeout(() => { 
                                    this.props.history.push('/login')
                                }, 3000)
                            } else {
                                var splitcX1 = document.location.href.split('/')
                                if(splitcX1.length !== 5){
                                    this.props.history.push('/login')
                                }
                            }
                        }
                    } else {
                        if(link[1].length > 0){
                            var idT = link[1]
                
                            var resE1 = await verifycode1(idT, cancelToken)
                            if(resE1.status === 0){
                                if(resE1.data['status'] === 0){
                                    this.setState({
                                        contenttype: 3,
                                        recievedID: idT
                                    })
                                } else {
                                    var splitcG = document.location.href.split('/')
                                    if(splitcG.length !== 5){
                                        this.props.history.push('/login')
                                    }
                                }
                            } else {
                                if(resE1.status === 2){
                                    message.error(" you are able to change password once in 24 hours")
                                    setTimeout(() => { 
                                        this.props.history.push('/login')
                                    }, 3000)
                                } else {
                                    var splitcXC = document.location.href.split('/')
                                    if(splitcXC.length !== 5){
                                        this.props.history.push('/login')
                                    }
                                }
                            }
                        }   
                    }
                     
                }
                
            }
            
        }
    }

    resetPassword = async() => {
        if(this.state.password === this.state.password2){
            var id = {
                'username': this.state.username,
                'password': this.state.password
            }
            var cancelToken = this.source.token

            var resE = await resetPasswordLink(id, cancelToken)
            if(resE.status === 0){
                this.props.history.push('/login')
            }
        } else {
            message.error(" passwords does not match")
        }

    }

    updateEmail = async() => {
        var isValid = await this.validateEmail(this.state.emailAddress)
        if(isValid === true){
            var language = await storageUtils.getLanguage()
            var cancelToken = this.source.token

            var res = await createForgotModal(this.state.emailAddress, language, cancelToken)
            if(res.status === 0){
                message.success(" message is on it's way to user")
                // this.props.history.push('/login')
            } else {
                if(res.status === 2){
                    message.error(" you are able to change password once in 24 hours")
                    setTimeout(() => { 
                        this.props.history.push('/login')
                    }, 3000)
                } else {
                    message.error(" failed to send an email to user")
                    setTimeout(() => { 
                        this.props.history.push('/login')
                    }, 3000)
                }
                
            }
        } else {
            message.error(" it's not an email")
        }
    }


    sendEmailReset = async() => {
        var isValid = await this.validateEmail(this.state.emailAddress)
        if(isValid === true){
            var language = await storageUtils.getLanguage()
            var cancelToken = this.source.token 

            var res = await createForgotModal2(this.state.emailAddress, language, cancelToken)
            if(res.status === 0){
                message.success(" message is on it's way to user")
                // this.props.history.push('/login')
                setTimeout(() => { 
                    this.props.history.push('/login')
                }, 1500)
            } else {
                if(res.status === 2){
                    message.error(" you are able to remove 2fa once in 24 hours")
                    setTimeout(() => { 
                        this.props.history.push('/login')
                    }, 3000)
                } else {
                    message.error(" failed to send an email to user")
                    setTimeout(() => { 
                        this.props.history.push('/login')
                    }, 3000)
                }
            }
        } else {
            message.error(" it's not an email")
        }
    }

    sendEmailReset2 = async() => {
        var isValid = await this.validateEmail(this.state.emailAddress)
        if(isValid === true){
            var language = await storageUtils.getLanguage()
            var cancelToken = this.source.token 

            var res = await createForgotModal2x(this.state.emailAddress, language, cancelToken)
            if(res.status === 0){
                message.success(" message is on it's way to user")
                // this.props.history.push('/login')
                setTimeout(() => { 
                    this.props.history.push('/login')
                }, 1500)
            } else {
                if(res.status === 2){
                    message.error(" you are able to remove PIN once in 24 hours")
                    setTimeout(() => { 
                        this.props.history.push('/login')
                    }, 3000)
                } else {
                    message.error(" failed to send an email to user")
                    setTimeout(() => { 
                        this.props.history.push('/login')
                    }, 3000)
                }
            }
        } else {
            message.error(" it's not an email")
        }
    }

    
    verifyCode = async() => {
        const CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
        
        
        var cancelToken = this.source.token
        
        var resE = await verifypwtoken(this.state.verifyx, cancelToken)
        if(resE.status === 0){
            if(resE.data['status'] === 0){
                this.setState({
                    contenttype: 2
                })
            } else {
                var splitc = document.location.href.split('/')
                if(splitc.length !== 5){
                    this.props.history.push('/login')
                }
            }
        } else {
            var splitcX = document.location.href.split('/')
            if(splitcX.length !== 5){
                this.props.history.push('/login')
            }
            
        }

    }

    verifyCodeXC = async() => {
        const CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
        
        
        var cancelToken = this.source.token
        
        var resE = await verifypwtoken2(this.state.verifyx, cancelToken)
        if(resE.status === 0){
            if(resE.data['status'] === 0){
                message.success(" 2fa successfully removed")
                setTimeout(() => {
                    this.props.history.push('/login')
                }, 1500)
                
            } else {
                var splitc = document.location.href.split('/')
                if(splitc.length !== 5){
                    this.props.history.push('/login')
                }
            }
        } else {
            var splitcX = document.location.href.split('/')
            if(splitcX.length !== 5){
                this.props.history.push('/login')
            }
            
        }

    }

    verifyCodeXCX = async() => {
        const CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
        
        
        var cancelToken = this.source.token
        
        var resE = await verifypwtoken2x(this.state.verifyx, cancelToken)
        if(resE.status === 0){
            if(resE.data['status'] === 0){
                message.success(" PIN successfully removed")
                setTimeout(() => {
                    this.props.history.push('/login')
                }, 1500)
                
            } else {
                var splitc = document.location.href.split('/')
                if(splitc.length !== 5){
                    this.props.history.push('/login')
                }
            }
        } else {
            var splitcX = document.location.href.split('/')
            if(splitcX.length !== 5){
                this.props.history.push('/login')
            }
            
        }

    }


    emailPassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    emailPassword2 = (e) => {
        this.setState({
            password2: e.target.value
        })
    }

    emailUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    verifycodex = (e) => {
        this.setState({
            verifyx: e.target.value
        })
    }

    handleMethodChange = (e) => {
        this.setState({
            recoverMethod: e
        })
    }

    verifyMethodChange = () => {
        if(this.state.recoverMethod === 'password'){
            this.setState({
                contenttype: 1
            })
        }
        if(this.state.recoverMethod === '2fa'){
            this.setState({
                contenttype: 5
            })
        }
        if(this.state.recoverMethod === 'pin'){

        }
    }


    render() {
        var theme = storageUtils.getTheme()
        var color = '#fff' 
        var color3 = 'black'
        if(theme === 'dark'){
          color = '#141414'
          color3 = '#c2c2c2'
        }

        


        if(this.state.contenttype === 4){
            return (
                <div style={{backgroundColor: '#e6e4e3', width: '100%', height: '100%', position: 'fixed', display: 'grid'}}>
                <div className='kc1cv' style={{width: '35%', height: '100%', backgroundColor: 'white'}}>
                    <div className='yalac-xz' style={{textAlign: 'center', display: 'grid', width: '100%', marginTop: '320px', justifyContent: 'center'}}>
                        <p className='klc-1' style={{fontSize: '16px', color: 'black'}}>What you need to recover ? </p>

                        <div style={{textAlign: 'left', marginTop: '13%'}}>
                            <p className='lkl-c' style={{fontSize: '14px', color: 'black'}}>Recover method</p>
                            <Select 
                                style={{width: '330px'}}
                                onChange={this.handleMethodChange}
                            >
                                <Option style={{fontSize: '12px', backgroundColor: color, color: color3}} value={"password"}>Password Recover</Option>
                                <Option style={{fontSize: '12px', backgroundColor: color, color: color3}} value={"2fa"}>2FA Recover</Option>
                                <Option style={{fontSize: '12px', backgroundColor: color, color: color3}} value={"pin"}>PIN Recover</Option>
                            </Select>


                        </div>
                        <Button style={{width: '165px', marginTop: '25px', marginLeft: '80px'}} onClick={() => { this.verifyMethodChange()}}>Next</Button>

                    </div>
                </div>            
            
                </div>
            )

        }
        if(this.state.contenttype === 5){
            return (
                <div style={{backgroundColor: '#e6e4e3', width: '100%', height: '100%', position: 'fixed', display: 'grid'}}>
                <div className='kc1cv' style={{width: '35%', height: '100%', backgroundColor: 'white'}}>
                    <div style={{textAlign: 'center', display: 'grid', width: '100%', marginTop: '320px', justifyContent: 'center'}}>
                        <p className='klc-1' style={{fontSize: '16px', color: 'black'}}>Reset 2FA Authorization</p>

                        <div style={{textAlign: 'left', marginTop: '13%'}}>
                            <p className='lkl-c' style={{fontSize: '14px', color: 'black'}}>Email</p>
                            <Input style={{width: '330px'}} onChange={(e) => { this.emailNotification(e)}}/>


                        </div>
                        <Button style={{width: '165px', marginTop: '25px', marginLeft: '80px'}} onClick={() => { this.sendEmailReset()}}>Next</Button>

                    </div>
                </div>            
            
                </div>
            )

        }
        if(this.state.contenttype === 6){
            return (
                <div style={{backgroundColor: '#e6e4e3', width: '100%', height: '100%', position: 'fixed', display: 'grid'}}>
                    
                    <div className='kc1cv' style={{width: '35%', height: '100%', backgroundColor: 'white'}}>
                        <div style={{textAlign: 'center', display: 'grid', width: '100%', marginTop: '320px', justifyContent: 'center'}}>
                            <p className='klc-1' style={{fontSize: '16px', color: 'black'}}>We sent an email !</p>
    
                            <div style={{textAlign: 'left', marginTop: '20px'}}>
                                <p className='lkl-c' style={{fontSize: '14px', color: 'black'}}>Verification Code</p>
                                <Input style={{width: '330px'}} onChange={(e) => { this.verifycodex(e)}}/>
    
                            </div>
                            
    
                            <Button style={{width: '165px', marginTop: '25px', marginLeft: '80px'}} onClick={() => { this.verifyCodeXC()}}>Submit</Button>
    
                        </div>
                    </div>
                    
                    
                    
    
                </div>
            )
        }
        if(this.state.contenttype === 7){
            return (
                <div style={{backgroundColor: '#e6e4e3', width: '100%', height: '100%', position: 'fixed', display: 'grid'}}>
                <div className='kc1cv' style={{width: '35%', height: '100%', backgroundColor: 'white'}}>
                    <div style={{textAlign: 'center', display: 'grid', width: '100%', marginTop: '320px', justifyContent: 'center'}}>
                        <p className='klc-1' style={{fontSize: '16px', color: 'black'}}>Reset PIN Authorization</p>

                        <div style={{textAlign: 'left', marginTop: '13%'}}>
                            <p className='lkl-c' style={{fontSize: '14px', color: 'black'}}>Email</p>
                            <Input style={{width: '330px'}} onChange={(e) => { this.emailNotification(e)}}/>


                        </div>
                        <Button style={{width: '165px', marginTop: '25px', marginLeft: '80px'}} onClick={() => { this.sendEmailReset2()}}>Next</Button>

                    </div>
                </div>            
            
                </div>
            )

        }
        if(this.state.contenttype === 8){
            return (
                <div style={{backgroundColor: '#e6e4e3', width: '100%', height: '100%', position: 'fixed', display: 'grid'}}>
                    
                    <div className='kc1cv' style={{width: '35%', height: '100%', backgroundColor: 'white'}}>
                        <div style={{textAlign: 'center', display: 'grid', width: '100%', marginTop: '320px', justifyContent: 'center'}}>
                            <p className='klc-1' style={{fontSize: '16px', color: 'black'}}>We sent an email !</p>
    
                            <div style={{textAlign: 'left', marginTop: '20px'}}>
                                <p className='lkl-c' style={{fontSize: '14px', color: 'black'}}>Verification Code</p>
                                <Input style={{width: '330px'}} onChange={(e) => { this.verifycodex(e)}}/>
    
                            </div>
                            
    
                            <Button style={{width: '165px', marginTop: '25px', marginLeft: '80px'}} onClick={() => { this.verifyCodeXCX()}}>Submit</Button>
    
                        </div>
                    </div>
                    
                    
                    
    
                </div>
            )
        }

        if(this.state.contenttype === 3){
            return (
                <div style={{backgroundColor: '#e6e4e3', width: '100%', height: '100%', position: 'fixed', display: 'grid'}}>
                    
                    <div className='kc1cv' style={{width: '35%', height: '100%', backgroundColor: 'white'}}>
                        <div style={{textAlign: 'center', display: 'grid', width: '100%', marginTop: '320px', justifyContent: 'center'}}>
                            <p className='klc-1' style={{fontSize: '16px', color: 'black'}}>We sent an email !</p>
    
                            <div style={{textAlign: 'left', marginTop: '20px'}}>
                                <p className='lkl-c' style={{fontSize: '14px', color: 'black'}}>Verification Code</p>
                                <Input style={{width: '330px'}} onChange={(e) => { this.verifycodex(e)}}/>
    
                            </div>
                            
    
                            <Button style={{width: '165px', marginTop: '25px', marginLeft: '80px'}} onClick={() => { this.verifyCode()}}>Submit</Button>
    
                        </div>
                    </div>
                    
                    
                    
    
                </div>
            )
        } else {
            if(this.state.contenttype === 2){
                return (
                    <div style={{backgroundColor: '#e6e4e3', width: '100%', height: '100%', position: 'fixed', display: 'grid'}}>
                        
                        <div className='kc1cv' style={{width: '35%', height: '100%', backgroundColor: 'white'}}>
                            <div style={{textAlign: 'center', display: 'grid', width: '100%', marginTop: '320px', justifyContent: 'center'}}>
                                <p className='klc-1' style={{fontSize: '16px', color: 'black'}}>Reset Password</p>
        
                                <div style={{textAlign: 'left', marginTop: '20px'}}>
                                    <p className='lkl-c' style={{fontSize: '14px', color: 'black'}}>Username</p>
                                    <Input style={{width: '330px'}} value={this.state.username} onChange={(e) => { this.emailUsername(e)}}/>
        
                                </div>
                                <div style={{textAlign: 'left', marginTop: '20px'}}>
                                    <p className='lkl-c' style={{fontSize: '14px', color: 'black'}}>New Password</p>
                                    <Input.Password autoComplete="new-password" style={{width: '330px'}}  onChange={(e) => { this.emailPassword(e)}}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                    />
                                </div>
                                <div style={{textAlign: 'left', marginTop: '20px'}}>
                                    <p className='lkl-c' style={{fontSize: '14px', color: 'black'}}>Confirm Password</p>
                                    <Input.Password autoComplete="new-password" style={{width: '330px'}}   onChange={(e) => { this.emailPassword2(e)}}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                    />
                                </div>
    
                                
        
                                <Button style={{width: '165px', marginTop: '25px', marginLeft: '80px'}} onClick={() => { this.resetPassword()}}>Submit</Button>
        
                            </div>
                        </div>
                    </div>
                )
            } else {
                if(this.state.contenttype === 1){
                    return (
                        <div style={{backgroundColor: '#e6e4e3', width: '100%', height: '100%', position: 'fixed', display: 'grid'}}>
                            
                            <div className='kc1cv' style={{width: '35%', height: '100%', backgroundColor: 'white'}}>
                                <div style={{textAlign: 'center', display: 'grid', width: '100%', marginTop: '320px', justifyContent: 'center'}}>
                                    <p className='klc-1' style={{fontSize: '16px', color: 'black'}}>Reset Password</p>
            
                                    <div style={{textAlign: 'left', marginTop: '20px'}}>
                                        <p style={{fontSize: '14px', color: 'black'}}>Email</p>
                                        <Input style={{width: '330px'}} onChange={(e) => { this.emailNotification(e)}}/>
            
                                    </div>
            
                                    <Button style={{width: '165px', marginTop: '25px', marginLeft: '80px'}} onClick={() => { this.updateEmail()}}>Submit</Button>
            
                                </div>
                            </div>
                            
                            
                            
            
                        </div>
                    )
                } else {
                    return <div></div>
                }
            }
            
        }
        
    }
    
}
