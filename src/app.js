const React = require('react');

const {Fullpage, Slide, TopNav, SideNav} = require('fullpage-react');
import { Grid, Row, Col, Button } from 'react-bootstrap';
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
          <div className="title">Yooooo</div>          
          <h1 className="name">Michael Walker</h1>
          <h2 className="current-title">Full Stack Dev</h2>
          <h2 className="current-city">Oakland</h2>
          <h2 className="current-employer">Currently @ <a href="www.madison-reed.com">Madison Reed</a></h2>          
        </Slide>
        <Slide id="slide2" className="slide coal-b">
          <div className="arrow-up arrow-up-1 abs-top top-100"></div>
          <div className="title">Interests</div>
          <Grid>
            <Row>              
              <Col xs={6}>Col 1</Col>
              <Col xs={6}>Col 2</Col>
            </Row>
          </Grid>
        </Slide>
        <Slide id="slide3" className="slide canary-b">
          <div className="arrow-up arrow-up-2 abs-top top-200"></div>
          <div className="title">Current Stack</div>
          <Grid>
            <Row>              
              <Col xs={6}>Box 1</Col>
              <Col xs={6}>Box 2</Col>
            </Row>
            <Row>              
              <Col xs={6}>Box 3</Col>
              <Col xs={6}>Box 4</Col>
            </Row>
          </Grid>
        </Slide>
        <Slide id="slide4" className="slide metal-b">
          <div className="arrow-up arrow-up-3 abs-top top-300"></div>
          <div className="title">
            Contact            
          </div>          
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
