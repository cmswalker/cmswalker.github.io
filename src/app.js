import React from 'react';

import { Fullpage, Slide } from'fullpage-react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

require('./styles/font-awesome.min.css');
require('normalize.css');
require('./styles/main.styl');

const fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 10 is default
  scrollSensitivity: 7,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 10 is default
  touchSensitivity: -3,
  scrollSpeed: 500,
  resetSlides: true,
  hideScrollBars: true,
  enableArrowKeys: true
};

// all children are spans by default, for stacked buttons,
// just wrap your nested components/buttons in divs
const sideNavOptions = {
  right: '2%', //left alignment is default
  top: '50%', //top is 50% by default

  //styles to apply to children
  activeStyles: {color: '#E1EFE6'},
  hoverStyles: {color: '#EFCB68'},
  nonActiveStyles: {color: 'gray'}
};

const slides = [
  <Slide id="slide1" className="slide turtle-b">
    <div className="title main-title">Yooooo</div>
    <Grid className="main-slide">
      <h1 className="name upper">Michael Walker</h1>
      <h2 className="current-title">Full Stack Dev</h2>
      <h2 className="current-city upper">Oakland</h2>
      <h2 className="current-employer">Currently @ <a target="_blank" href="https://www.opentable.com">OpenTable</a></h2>
    </Grid>
  </Slide>,

  <Slide id="slide2" className="slide coal-b">
    <div className="arrow-up arrow-up-1 abs-top top-100"></div>
    <div className="sub-title">Current Tools</div>
    <Grid className="current-stack">
      <Row className="stack-row">
        <Col className="box" xs={6}>
          <img className="img-icon" src="./assets/images/node-icon.png"></img>
          <h2 className="upper">Dev</h2>
          <p>Javascript, Node.js, Express, Angular, React, Electron, Babel, Mocha</p>
        </Col>
        <Col className="box" xs={6}>
          <i className="fa fa-database" aria-hidden="true"></i>
          <h2 className="upper">Data</h2>
          <p>SQL, MongoDB, GraphQL, Elasticsearch, Redis, Segment, Snowflake, custom ORM's</p>
        </Col>
      </Row>
      <Row className="stack-row">
        <Col className="box" xs={6}>
          <i className="fa fa-wrench" aria-hidden="true"></i>
          <h2 className="upper">Build</h2>
          <p>Docker, Mesos, TDD, BDD, Automation, Jenkins, Travis, TC, Webpack</p>
        </Col>
        <Col className="box" xs={6}>
          <i className="fa fa-suitcase" aria-hidden="true"></i>
          <h2 className="upper">Other</h2>
          <p>API Design, A|B Testing, UX, Go, Ruby, Rails, Python</p>
        </Col>
      </Row>
    </Grid>
  </Slide>,

  <Slide id="slide3" className="slide canary-b">
    <div className="arrow-up arrow-up-2 abs-top top-200"></div>
    <div className="sub-title">Interests</div>
    <Grid className="interests">
      <Row>
        <Col className="int-col related-interests" xs={12} sm={6}>
          <i className="fa fa-code lacroix-pair" aria-hidden="true"></i>
          <h2 className="upper">Related</h2>
          <p>
            <span className="oss">Open Source</span> <i className="fa fa-caret-down" aria-hidden="true"></i><br />
            <a target="_blank" href="https://www.npmjs.com/~cmswalker">npm</a><br />
            <a target="_blank" href="https://github.com/cmswalker">GitHub</a><br />
            <a target="_blank" href="https://github.com/opentable/oc">Open Components</a><br />
            Anything Javascript<br />
            Good Documentation<br />
            Linters<br />
            Tests!<br />
          </p>
        </Col>
        <Col className="int-col not-interests" xs={12} sm={6}>
          <img className="img-icon lacroix" src="./assets/images/laCroixIcon.png"></img>
          <h2 className="upper">Not</h2>
          <p>
            Ugly Dogs<br />
            <a target="_blank" href="https://www.instagram.com/p/BG2SVBHy5Gg/?taken-by=huskyjeans1738&hl=en">Proud Father</a><br />
            <a target="_blank" href="https://www.instagram.com/explore/tags/raidernation/">R4L</a>
          </p>
        </Col>
      </Row>
    </Grid>
  </Slide>,

  <Slide id="slide4" className="slide metal-b">
    <div className="arrow-up arrow-up-3 abs-top top-300"></div>
    <div className="sub-title">Contact</div>
    <Grid className="contact">
      <Row className="contact-row">
        <Col xs={6}>
          <a target="_blank" href="mailto:c.michael.s.walker@gmail.com"><i className="fa fa-paper-plane"></i></a>
        </Col>
        <Col xs={6}>
          <a target="_blank" href="https://www.instagram.com/huskyjeans1738/"><i className="fa fa-instagram"></i></a>
        </Col>
      </Row>
      <Row className="contact-row">
        <Col xs={6}>
          <a target="_blank" href="https://github.com/cmswalker"><i className="fa fa-github"></i></a>
        </Col>
        <Col xs={6}>
          <a target="_blank" href="https://www.npmjs.com/~cmswalker">npm</a>
        </Col>
      </Row>
    </Grid>
  </Slide>
];

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
      <Fullpage active={this.updateActiveState} slides={slides} >


      </Fullpage>
    );
  }
};

module.exports = FullpageReact;
