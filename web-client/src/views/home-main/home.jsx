
import React, { Component } from 'react'
import menuList from '../../config/menuConfig'
import {
    List,
    Button,
    Menu
} from 'antd'

import { 
    RetweetOutlined,
    SearchOutlined,
    CalendarOutlined,
    SlidersOutlined,
    ForwardOutlined,
    ControlOutlined,
    BookOutlined,
    BellOutlined,
    RocketOutlined,
    HistoryOutlined,
    SnippetsOutlined,
    WalletOutlined,
    ToolOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    CopyOutlined,
    TeamOutlined
} from '@ant-design/icons'
import storageUtils from '../../utils/storageUtils'
import MediaQuery from 'react-responsive'
import './home.less'
export default class HomeMain extends Component {
    constructor (props) {
      super(props)
  
      this.state = {
        tableloading: true,
        isTableIconHidden: '',
        tableText: 'No Data',
        key: "1"

      }
    }


    componentDidMount = () => {
        this.setState({
            tableloading: false,
            isTableIconHidden: 'hidden',
            tableText: ''
        })


    }



    changeRoute = (key) => {
        this.props.history.replace(key)
    }

    onClick2 = (e) => {
        this.setState({key: e.key});
    };


    render(){
        const { isTableIconHidden, tableText } = this.state


        var theme = storageUtils.getTheme()
        var color = '#fff' // bright white 
        var color3 = 'grey' 
        var color2 = 'rgb(225, 227, 234)' // dark tone
        var color4 = 'white'
        var borderColl = '#f0f0f5'
        var colorXM = 'rgb(255, 255, 255)'
        if(theme === 'dark'){
          color = '#141414'
          color2 = 'rgb(62, 58, 58)'
          color3 = '#c2c2c2'
          color4 = '#1b1b1b'
          borderColl = 'rgb(62, 58, 58)'
          colorXM = '#1b1b1b'
        }


        var listContent = []

        if(this.state.key === "1"){
            listContent = [
                { title: 'Explorer', key: '/explorer', icon: 'search' },
                { title: 'Watchlist', key: '/watchlist', icon: 'retweet' },
                { title: 'Calendar', key: '/calendar', icon: 'calendar' },
                { title: 'Documents', key: '/documents', icon: 'copy' },

                { title: 'Trade', key: '/markets', icon: 'sliders' },
                // { title: 'Planner', key: '/planner', icon: 'forward' },
                { title: 'Diagrams', key: '/diagram', icon: 'book' },
                { title: 'Sheet Editor', key: '/spreadsheet', icon: 'menufold' },
                // { title: 'News', key: '/news', icon: 'bell' },
                { title: 'Trading Bots', key: '/constructors', icon: 'rocket'},
                { title: 'Trade History', key: '/trade-history', icon: 'history' },
                { title: 'Signal History', key: '/signal-history', icon: 'snippets' },
                { title: 'Wallet', key: '/wallet',  icon: 'control' },
                { title: 'API Settings', key: '/settings',  icon: 'tool' },
                { title: 'User Account', key: '/user', icon: 'home' }
            ]
        }
        if(this.state.key === "2"){
            listContent = [
                // { title: 'News', key: '/news', icon: 'bell' },
                { title: 'Watchlist', key: '/watchlist', icon: 'retweet' },
            ]
        }
        if(this.state.key === "3"){
            listContent = [
                { title: 'Spot Market', key: '/markets/spot',  icon: 'sliders' },
                { title: 'Futures Market', key: '/markets/futures',  icon: 'sliders' },
                { title: 'Margin Market', key: '/markets/margin',  icon: 'sliders' },
                { title: 'Multi Trade', key: '/watchlist', icon: 'retweet' },
            ]
        }
        if(this.state.key === "4"){
            listContent = [
                { title: 'Diagrams', key: '/diagram', icon: 'book' },
                { title: 'Calendar', key: '/calendar', icon: 'calendar' },
                { title: 'Documents', key: '/documents', icon: 'copy' },
                { title: 'Sheet Editor', key: '/spreadsheet', icon: 'menufold' }

            ]
        }
        if(this.state.key === "5"){
            listContent = [
                { title: 'Trading Bots', key: '/constructors', icon: 'rocket'},
                // { title: 'Planner', key: '/planner', icon: 'forward' },
            ]
        }
        if(this.state.key === "6"){
            listContent = [
                { title: 'Wallet', key: '/wallet',  icon: 'control' },
                { title: 'API Settings', key: '/settings',  icon: 'tool' },
                { title: 'User Account', key: '/user', icon: 'home' },
                { title: 'Trade History', key: '/trade-history', icon: 'history' },
                { title: 'Signal History', key: '/signal-history', icon: 'snippets' },
            ]
        }
        if(this.state.key === '7'){
            listContent = [
                { title: 'Bot Explorer', key: '/explorer/bots', icon: 'search' },
                { title: 'Planner Explorer', key: '/explorer/planner', icon: 'search' },
            ]
        }


        var styleXM = {display: 'grid', scrollbarWidth: 'none', overflow: 'auto'}
        if(document.body.offsetWidth >= 566){
            styleXM = {display: 'grid', scrollbarWidth: 'none', overflow: 'auto', backgroundColor: colorXM, height: '100%'}
        }
        


        return (<div  className='sds-av2' style={styleXM}>
            <MediaQuery minWidth={1300}>
            <Menu className='buginat' onClick={this.onClick2} selectedKeys={[this.state.key]} mode="horizontal" style={{width: '70%', height: '47px', marginLeft: '17%', marginTop: '8%', backgroundColor: 'transparent', borderColor: 'transparent', color: color3}}>
                 <Menu.Item key="1" icon={''} style={{width: '168px', marginBottom: '20px', borderColor: color2, marginTop: '1%', borderRadius: '4px', backgroundColor: color, borderStyle: 'solid', borderWidth: '1px', height: '33px',  fontSize: '12px', color: color3, textAlign: 'center', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '25px', paddingRight: '25px',letterSpacing: '.02rem', boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px', transition: '0.3s all ease' }}>
                    All
                </Menu.Item>
                <Menu.Item key="2" icon={''} style={{width: '151px', marginBottom: '20px', borderColor: color2, marginTop: '1%', borderRadius: '4px', backgroundColor: color, borderStyle: 'solid', borderWidth: '1px', height: '33px',  fontSize: '12px', color: color3, textAlign: 'center', marginLeft: '1%',  paddingTop: '0px', paddingBottom: '0px', paddingLeft: '25px', paddingRight: '25px',  letterSpacing: '.02rem', boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px', transition: '0.3s all ease' }}>
                    Tools
                </Menu.Item>
                <Menu.Item key="3" icon={''} style={{width: '151px', marginBottom: '20px', borderColor: color2, marginTop: '1%', borderRadius: '4px', backgroundColor: color, borderStyle: 'solid', borderWidth: '1px', height: '33px', fontSize: '12px', color: color3, textAlign: 'center', marginLeft: '1%', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '25px', paddingRight: '25px',  letterSpacing: '.02rem', boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px', transition: '0.3s all ease' }}>
                    Trading Panels
                </Menu.Item>
                <Menu.Item key="4" icon={''} style={{width: '151px', marginBottom: '20px', borderColor: color2, marginTop: '1%', borderRadius: '4px', backgroundColor: color, borderStyle: 'solid', borderWidth: '1px', height: '33px', fontSize: '12px', color: color3, textAlign: 'center', marginLeft: '1%', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '25px', paddingRight: '25px',  letterSpacing: '.02rem', boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px', transition: '0.3s all ease' }}>
                    Planning Tools
                </Menu.Item>
                <Menu.Item key="5" icon={''} style={{width: '151px', marginBottom: '20px', borderColor: color2, marginTop: '1%', borderRadius: '4px', backgroundColor: color, borderStyle: 'solid', borderWidth: '1px', height: '33px', fontSize: '12px', color: color3, textAlign: 'center', marginLeft: '1%', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '25px', paddingRight: '25px',  letterSpacing: '.02rem', boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px', transition: '0.3s all ease' }}>
                    Automatisation
                </Menu.Item>
                <Menu.Item key="6" icon={''} style={{width: '151px', marginBottom: '20px', borderColor: color2, marginTop: '1%', borderRadius: '4px', backgroundColor: color, borderStyle: 'solid', borderWidth: '1px', height: '33px', fontSize: '12px', color: color3, textAlign: 'center', marginLeft: '1%',  paddingTop: '0px', paddingBottom: '0px', paddingLeft: '25px', paddingRight: '25px',  letterSpacing: '.02rem', boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px', transition: '0.3s all ease' }}>
                    Account
                </Menu.Item>
                <Menu.Item key="7" icon={''} style={{width: '151px', marginBottom: '20px', borderColor: color2, marginTop: '1%', borderRadius: '4px', backgroundColor: color, borderStyle: 'solid', borderWidth: '1px', height: '33px', fontSize: '12px', color: color3, textAlign: 'center', marginLeft: '1%', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '25px', paddingRight: '25px',  letterSpacing: '.02rem', boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px', transition: '0.3s all ease' }}>
                    Explorer
                </Menu.Item>
            </Menu>
            <div style={{width: '90%', height: '560px', marginLeft: '7%', marginTop: '1%', marginBottom: '14%'}}>
            <List style={{width: '100%', marginTop: '1%', marginLeft: '2%'}} locale={{ emptyText: (<div>
                <RetweetOutlined spin={true} style={{color: 'black', visibility: isTableIconHidden, fontSize: '26px'}}/>
                <p style={{color: 'black', marginTop: 5}}>{tableText}</p>
                </div>)}}
                bordered={false}
                dataSource={listContent}
                loading={this.state.tableloading}
                pagination={null}
                size={'small'}
                renderItem={item => {
                    var icon = []
                    var widt1 = '16px'
                    var topm = '16px'

                    if(item.icon === 'search'){ icon.push(<SearchOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'retweet'){ icon.push(<RetweetOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'calendar'){ icon.push(<CalendarOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'sliders'){ icon.push(<SlidersOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'forward'){ icon.push(<ForwardOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'control'){ icon.push(<ControlOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'book'){ icon.push(<BookOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'bell'){ icon.push(<BellOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'rocket'){ icon.push(<RocketOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'history'){ icon.push(<HistoryOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'snippets'){ icon.push(<SnippetsOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'wallet'){ icon.push(<WalletOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'tool'){ icon.push(<ToolOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'home'){ icon.push(<HomeOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'menufold'){ icon.push(<MenuFoldOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'copy'){ icon.push(<CopyOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'team'){ icon.push(<TeamOutlined style={{color: color3, fontSize: widt1, marginTop: topm}} />)}
    

                    return (
                        <List.Item  style={{float: 'left', width: '20%', height: '115px', backgroundColor: color4, marginLeft: '1%', borderColor: color2, marginTop: '1%', borderRadius: '15px', borderStyle: 'solid', borderWidth: '1px', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '25px', paddingRight: '25px',  letterSpacing: '.02rem', boxShadow: 'rgba(119, 114, 114, 0.2) -9px -3px 10px -7px', transition: '0.3s all ease' }}>
                            <div style={{width: '100%', textAlign: 'center'}}>
                                <div className='side-by-side'>
                                    {/* <div style={{width: '60%'}}> */}
                                        {/* <p style={{fontSize: '15px', color: color3, marginTop: '13px', marginLeft: '8%'}}>{item.title}</p> */}
                                    {/* </div> */}
                                    <div style={{width: '100%'}}>
                                        {icon}    
                                    </div>
                                </div>
                                <Button onClick={() => { this.changeRoute(item.key)}} style={{width: '70%', fontSize: '11px', height: '24px', marginTop: '12px', backgroundColor: color4, borderColor: 'transparent', color: color3}}>{item.title}</Button>
                                   
                            </div>
                        </List.Item>
                    )
                }}
            />
            </div>


            </MediaQuery>
            <MediaQuery maxWidth={1299} minWidth={567}>

            <Menu className='buginat' onClick={this.onClick2} selectedKeys={[this.state.key]} mode="horizontal" style={{width: '98%', height: '47px', marginLeft: '7%', marginTop: '5%', backgroundColor: 'transparent', borderColor: color2, color: color3}}>
                 <Menu.Item key="1" icon={''} style={{width: '14%', marginBottom: '20px', borderColor: color2, marginTop: '1%', borderRadius: '4px', backgroundColor: color, borderStyle: 'solid', borderWidth: '1px', height: '33px',  fontSize: '12px', color: color3, textAlign: 'center', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '25px', paddingRight: '25px',letterSpacing: '.02rem', boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px', transition: '0.3s all ease' }}>
                    All
                </Menu.Item>
                <Menu.Item key="2" icon={''} style={{width: '12%', marginBottom: '20px', borderColor: color2, marginTop: '1%', borderRadius: '4px', backgroundColor: color, borderStyle: 'solid', borderWidth: '1px', height: '33px',  fontSize: '12px', color: color3, textAlign: 'center', marginLeft: '1%',  paddingTop: '0px', paddingBottom: '0px', paddingLeft: '25px', paddingRight: '25px',  letterSpacing: '.02rem', boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px', transition: '0.3s all ease' }}>
                    Tools
                </Menu.Item>
                <Menu.Item key="3" icon={''} style={{width: '12%', marginBottom: '20px', borderColor: color2, marginTop: '1%', borderRadius: '4px', backgroundColor: color, borderStyle: 'solid', borderWidth: '1px', height: '33px', fontSize: '12px', color: color3, textAlign: 'center', marginLeft: '1%', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '25px', paddingRight: '25px',  letterSpacing: '.02rem', boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px', transition: '0.3s all ease' }}>
                    Trading Panels
                </Menu.Item>
                <Menu.Item key="4" icon={''} style={{width: '12%', marginBottom: '20px', borderColor: color2, marginTop: '1%', borderRadius: '4px', backgroundColor: color, borderStyle: 'solid', borderWidth: '1px', height: '33px', fontSize: '12px', color: color3, textAlign: 'center', marginLeft: '1%', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '25px', paddingRight: '25px',  letterSpacing: '.02rem', boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px', transition: '0.3s all ease' }}>
                    Planning Tools
                </Menu.Item>
                <Menu.Item key="5" icon={''} style={{width: '12%', marginBottom: '20px', borderColor: color2, marginTop: '1%', borderRadius: '4px', backgroundColor: color, borderStyle: 'solid', borderWidth: '1px', height: '33px', fontSize: '12px', color: color3, textAlign: 'center', marginLeft: '1%', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '25px', paddingRight: '25px',  letterSpacing: '.02rem', boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px', transition: '0.3s all ease' }}>
                    Automatisation
                </Menu.Item>
                <Menu.Item key="6" icon={''} style={{width: '12%', marginBottom: '20px', borderColor: color2, marginTop: '1%', borderRadius: '4px', backgroundColor: color, borderStyle: 'solid', borderWidth: '1px', height: '33px', fontSize: '12px', color: color3, textAlign: 'center', marginLeft: '1%',  paddingTop: '0px', paddingBottom: '0px', paddingLeft: '25px', paddingRight: '25px',  letterSpacing: '.02rem', boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px', transition: '0.3s all ease' }}>
                    Account
                </Menu.Item>
                <Menu.Item key="7" icon={''} style={{width: '12%', marginBottom: '20px', borderColor: color2, marginTop: '1%', borderRadius: '4px', backgroundColor: color, borderStyle: 'solid', borderWidth: '1px', height: '33px', fontSize: '12px', color: color3, textAlign: 'center', marginLeft: '1%', paddingTop: '0px', paddingBottom: '0px', paddingLeft: '25px', paddingRight: '25px',  letterSpacing: '.02rem', boxShadow: 'rgba(123, 123, 123, 0.2) 0px 2px 12px 2px', transition: '0.3s all ease' }}>
                    Explorer
                </Menu.Item>
            </Menu>
            <div style={{width: '100%', height: '560px', marginLeft: '6%', marginTop: '1%', marginBottom: '14%'}}>
            <List style={{width: '100%', marginTop: '1%', marginLeft: '2%'}} locale={{ emptyText: (<div>
                <RetweetOutlined spin={true} style={{color: 'black', visibility: isTableIconHidden, fontSize: '26px'}}/>
                <p style={{color: 'black', marginTop: 5}}>{tableText}</p>
                </div>)}}
                bordered={false}
                dataSource={listContent}
                loading={this.state.tableloading}
                pagination={null}
                size={'small'}
                renderItem={item => {
                    var icon = []
                    var widt1 = '16px'
                    var topm = '16px'

                    if(item.icon === 'search'){ icon.push(<SearchOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'retweet'){ icon.push(<RetweetOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'calendar'){ icon.push(<CalendarOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'sliders'){ icon.push(<SlidersOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'forward'){ icon.push(<ForwardOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'control'){ icon.push(<ControlOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'book'){ icon.push(<BookOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'bell'){ icon.push(<BellOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'rocket'){ icon.push(<RocketOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'history'){ icon.push(<HistoryOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'snippets'){ icon.push(<SnippetsOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'wallet'){ icon.push(<WalletOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'tool'){ icon.push(<ToolOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'home'){ icon.push(<HomeOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'menufold'){ icon.push(<MenuFoldOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'copy'){ icon.push(<CopyOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                    if(item.icon === 'team'){ icon.push(<TeamOutlined style={{color: color3, fontSize: widt1, marginTop: topm}} />)}
    
    

                    return (
                        <List.Item  style={{float: 'left', width: '20%', height: '115px', backgroundColor: color4, marginLeft: '1%', borderColor: color2, marginTop: '1%', borderRadius: '15px', borderStyle: 'solid', borderWidth: '1px', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '25px', paddingRight: '25px',  letterSpacing: '.02rem', boxShadow: 'rgba(119, 114, 114, 0.2) -9px -3px 10px -7px', transition: '0.3s all ease' }}>
                            <div style={{width: '100%', textAlign: 'center'}}>
                                <div className='side-by-side'>
                                    {/* <div style={{width: '60%'}}> */}
                                        {/* <p style={{fontSize: '15px', color: color3, marginTop: '13px', marginLeft: '8%'}}>{item.title}</p> */}
                                    {/* </div> */}
                                    <div style={{width: '100%'}}>
                                        {icon}    
                                    </div>
                                </div>
                                <Button onClick={() => { this.changeRoute(item.key)}} style={{width: '70%', fontSize: '11px', height: '24px', marginTop: '12px', backgroundColor: color4, borderColor: 'transparent', color: color3}}>{item.title}</Button>
                                   
                            </div>
                        </List.Item>
                    )
                }}
            />
            </div>

            </MediaQuery>
            <MediaQuery maxWidth={566}>
            <List style={{width: '100%', marginTop: '6%', marginLeft: '2%'}} locale={{ emptyText: (<div>
                <RetweetOutlined spin={true} style={{color: 'black', visibility: isTableIconHidden, fontSize: '26px'}}/>
                <p style={{color: 'black', marginTop: 5}}>{tableText}</p>
                </div>)}}
            bordered={false}
            dataSource={menuList}
            loading={this.state.tableloading}
            pagination={null}
            size={'small'}
            renderItem={item => {
         
                var icon = []
                var widt1 = '14px'
                var topm = '0px'

                if(item.icon === 'search'){ icon.push(<SearchOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'retweet'){ icon.push(<RetweetOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'calendar'){ icon.push(<CalendarOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'sliders'){ icon.push(<SlidersOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'forward'){ icon.push(<ForwardOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'control'){ icon.push(<ControlOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'book'){ icon.push(<BookOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'bell'){ icon.push(<BellOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'rocket'){ icon.push(<RocketOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'history'){ icon.push(<HistoryOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'snippets'){ icon.push(<SnippetsOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'wallet'){ icon.push(<WalletOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'tool'){ icon.push(<ToolOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'home'){ icon.push(<HomeOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'menufold'){ icon.push(<MenuFoldOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'copy'){ icon.push(<CopyOutlined style={{color: color3, fontSize: widt1, marginTop: topm}}/>)}
                if(item.icon === 'team'){ icon.push(<TeamOutlined style={{color: color3, fontSize: widt1, marginTop: topm}} />)}
    
    

                return (
                    <List.Item  style={{float: 'left', width: '47%', height: '140px', border: '0.095rem solid ' + borderColl, borderRadius: '4px', marginTop: '2%',  paddingTop: '8px', margin: '2px', paddingBottom: '8px', paddingLeft: '18px', paddingRight: '18px',  letterSpacing: '.02rem', boxShadow: 'rgba(119, 114, 114, 0.2) -9px -3px 10px -7px', transition: '0.3s all ease'}}>
                        <div style={{width: '100%', textAlign: 'center'}}>
                        {icon}
                        <p style={{fontSize: '13px', color: color3, marginTop: '8px'}}>{item.title}</p>
                        <Button onClick={() => { this.changeRoute(item.key)}} style={{width: '90%', fontSize: '10px', height: '26px',  backgroundColor: color, borderColor: borderColl, color: color3}}>OPEN</Button>
                        </div>
                        
  
                    </List.Item>
                )
            }}

            /> 
            </MediaQuery>

    

        </div>)
    }
}
