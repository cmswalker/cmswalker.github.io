const React = require('react');

const {Fullpage, Slide, TopNav, SideNav} = require('fullpage-react');
import { Grid, Row, Col, Button } from 'react-bootstrap';

require('../assets/fonts/MontSerrat.woff2');
require('./styles/font-awesome.min.css');
require('normalize.css');
require('./styles/main.styl');

let fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 100 is default
  threshold: 100,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 100 is default
  sensitivity: 100
};

let topNavOptions = {
  footer: false, //topNav can double as a footer if true
  align: 'left', //also supports center and right alignment

  //styles to apply to children
  activeStyles: {backgroundColor: 'white'},
  hoverStyles: {backgroundColor: 'yellow'},
  nonActiveStyles: {backgroundColor: 'gray'}
};

// all children are spans by default, for stacked buttons,
// just wrap your nested components/buttons in divs
let sideNavOptions = {
  right: '2%', //left alignment is default
  top: '50%', //top is 50% by default

  //styles to apply to children
  activeStyles: {color: 'white'},
  hoverStyles: {color: 'yellow'},
  nonActiveStyles: {color: 'gray'}
};

class FullpageReact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      hover: null
    };

    this.updateActiveState = this.updateActiveState.bind(this);
  }

  updateActiveState(newActive) {
    this.setState({'active': newActive});
  }

  shouldComponentUpdate(nP, nS) {
    //ensure hoverStyles and activeStyles update
    return nS.active != this.state.active || nS.hover != this.state.hover;
  }

  onMouseOver(idx) {
    this.setState({'hover': idx});
  }

  onMouseOut(e) {
    this.setState({'hover': null});
  }

  compareStyles(component, idx) {
    return idx == this.state.active ? component.activeStyles : idx == this.state.hover ? component.hoverStyles : component.nonActiveStyles
  }

  render() {
    let navCount = 4;
    let navArr = [];
    for (let i = 0; i < navCount; i++) {
      navArr.push(i);
    }

    return (
      <Fullpage active={this.updateActiveState}>

        <TopNav className="topNav" {...topNavOptions}>
          {navArr.map((n, idx) => {
            return <Button key={idx} ref={idx} style={this.compareStyles(topNavOptions, idx)}
              onMouseOver={() => this.onMouseOver(idx)} onMouseOut={() => this.onMouseOut(idx)}>Slide {idx}</Button>
          }, this)}
        </TopNav>

        <Slide id="slide1" className="slide turtle-b">
          <div className="title main-title">Yooooo</div>          
          <Grid className="main-slide">
            <h1 className="name upper">Michael Walker</h1>
            <h2 className="current-title">Full Stack Dev</h2>
            <h2 className="current-city upper">Oakland <i className="fa fa-shopping-cart" aria-hidden="true"></i></h2>
            <h2 className="current-employer">Currently @ <a target="_blank" href="https://www.madison-reed.com">Madison Reed</a></h2>            
          </Grid>          
        </Slide>
        <Slide id="slide2" className="slide coal-b">
          <div className="arrow-up arrow-up-1 abs-top top-100"></div>
          <div className="sub-title">Current Tools</div>
          <Grid className="current-stack">
            <Row>
              <Col className="box" xs={6}>
                <img className="img-icon" src="./websiteImages/node-icon.png"></img>
                <h2 className="upper">Dev</h2>
                <p>Javascript, Node.js, NPM, Express, Angular, React, Electron, Babel, Mocha</p>
              </Col>
              <Col className="box" xs={6}>                
                <i className="fa fa-database" aria-hidden="true"></i>
                <h2 className="upper">Data</h2>
                <p>MySQL, MongoDB, Elasticsearch, Redis, Segment, Snowflake</p>
              </Col>
            </Row>
            <Row>
              <Col className="box" xs={6}>
                <i className="fa fa-wrench" aria-hidden="true"></i>                
                <h2 className="upper">Build</h2>
                <p>AWS, Git, Webpack, Gulp, Jenkins, Travis</p>
              </Col>
              <Col className="box" xs={6}>
                <i className="fa fa-suitcase" aria-hidden="true"></i>
                <h2 className="upper">Other</h2>
                <p>A|B Testing, UX, Bash, Ruby, Rails, Python</p>
              </Col>
            </Row>
          </Grid>
        </Slide>
        <Slide id="slide3" className="slide canary-b">
          <div className="arrow-up arrow-up-2 abs-top top-200"></div>
          <div className="sub-title">Interests</div>
          <Grid className="interests">
            <Row>              
              <Col className="int-col related-interests" xs={12} md={6}>
                <i className="fa fa-code lacroix-pair" aria-hidden="true"></i>                
                <h2 className="upper">Related</h2>
                <p>                 
                <span className="oss">Open Source</span> <i className="fa fa-caret-down" aria-hidden="true"></i><br/>
                 <a target="_blank" href="https://www.npmjs.com/~cmswalker">npm</a><br/>
                 <a target="_blank" href="https://github.com/cmswalker">GitHub</a><br/>
                 Anything Javascript<br/>
                 Good Documentation<br/>                 
                 Crons<br/>
                 Bots<br/>
                </p>
              </Col>              
              <Col className="int-col not-interests" xs={12} md={6}>
                <img className="img-icon lacroix" src="./websiteImages/laCroixIcon.png"></img>               
                <h2 className="upper">Not</h2>
                <p>
                 La Croix<br/>
                 Ugly Dogs<br/>
                 <a target="_blank" href="https://www.instagram.com/p/BG2SVBHy5Gg/?taken-by=huskyjeans1738&hl=en">Proud Father</a>
                </p>
              </Col>
            </Row>
          </Grid>
        </Slide>
        <Slide id="slide4" className="slide metal-b">
          <div className="arrow-up arrow-up-3 abs-top top-300"></div>
          <div className="sub-title">Contact</div>
          <Grid className="contact">
            <Row>
              <Col xs={12}>
                <a href="mailto:c.michael.s.walker@gmail.com"><i className="fa fa-paper-plane"></i>
                  <p>
                    <span className="email font-mont">cmichaelswalker@gmail.com</span>
                  </p>
                </a>
              </Col>
              <Col xs={12}>
                <a href="https://www.instagram.com/huskyjeans1738/"><i className="fa fa-instagram"></i></a>
              </Col>
              <Col xs={12}>
                <a href="https://github.com/cmswalker"><i className="fa fa-github"></i></a>
              </Col>
              <Col xs={12}>
                <a href="https://www.npmjs.com/~cmswalker">npm</a>
              </Col>
            </Row>
          </Grid>
        </Slide>

        <SideNav className="sideNav" {...sideNavOptions}>          
          {navArr.map((n, idx) => {
            return <div key={idx} ref={idx} style={this.compareStyles(sideNavOptions, idx)}
                     onMouseOver={() => this.onMouseOver(idx)} onMouseOut={() => this.onMouseOut(idx)}>&#x25CF;</div>
          }, this)}          
        </SideNav>

      </Fullpage>
    );
  }
};

module.exports = FullpageReact;
