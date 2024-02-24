import React, { Component } from 'react'
import './functional2.less'
import storageUtils from '../../utils/storageUtils'
import MediaQuery from 'react-responsive'

export default class LoadingModule extends Component {
  constructor(props){
    super(props);

   this.state = {
      interval: 50
    }
  }



  render() {
    var theme = storageUtils.getTheme()
    var color = '#fff'
    if(theme === 'dark'){
      color = '#141414'
    }

    return (
      <div className="functional2" style={{backgroundColor: color}}>
        <MediaQuery minWidth={501}>
          <div style={{top: '47%', position: 'absolute', height: '72px', left: '51%'}}>
          <div class="loaderX">
  <div class="loader_cube loader_cube--glowing"></div>
  <div class="loader_cube loader_cube--color"></div>
  <div class="ball"></div>
</div>

          </div>
       
        {/* <div className="error-icon">
          <div id="holder" style={{marginTop: '65%'}}>
            <div id="load"><div></div><div></div></div>
          </div>
        </div> */}
        </MediaQuery>
        <MediaQuery maxWidth={500}>
        <div style={{top: '47%', position: 'absolute', height: '72px', left: '43%'}}>
        <div class="loaderX">
  <div class="loader_cube loader_cube--glowing"></div>
  <div class="loader_cube loader_cube--color"></div>
  <div class="ball"></div>
</div>


          </div>

        {/* <div className="error-icon">
          <div id="holder" style={{marginTop: '50%'}}>
            <div id="load"><div></div><div></div></div>
          </div>
        </div> */}
        </MediaQuery>
        


      </div>

    )
  }
}
