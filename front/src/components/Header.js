import React from 'react';

// Switch y Route nunca se usaban
import { Link } from 'react-router-dom';

import { Navbar, Nav, NavItem, MenuItem, Dropdown, Glyphicon} from "react-bootstrap";
import "./App.css";
import { slide as Menu } from 'react-burger-menu';
import LoginScreen from "../containers/LoginScreen";
import Clubs from "./Clubs";
import HomePage from "./HomePage";

// The Header creates links that can be used to navigate
// between routes.

class Account extends React.Component{
  render() {
    return (
      <ul className="configAccount">
      <Dropdown id="drop">
      <Dropdown.Toggle>
      <Glyphicon glyph="user" />

      </Dropdown.Toggle>
      <Dropdown.Menu>
      <MenuItem>
      <div className="navbar-login">
      <div className="row">
      <div className="col-lg-4">
      <p className="text-center">
      <span className="glyphicon glyphicon-user icon-size" />
      </p>
      </div>
      <div className="col-lg-8">
      <p className="text-left"><strong>Nombre Apellido</strong></p>
      <p className="text-left small">correoElectronico@email.com</p>
      <p className="text-left">
      </p>
      </div>
      </div>
      </div>
      </MenuItem>
      <MenuItem divider />
      <MenuItem>
      <div className="navbar-login navbar-login-session">
      <div className="row">
      <div className="col-lg-12">
      <p>
      <a href="#" className="btn btn-danger btn-block">Cerrar Sesion</a>
      </p>
      </div>
      </div>
      </div>
      </MenuItem>
      </Dropdown.Menu>
      </Dropdown>
      </ul>
      );
  }
};


class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    var classLogin="none";
    var classHome="none";
    var main = this.props.appContext.state.mainPage[0];
    if(main != null && (main.type.name =="Welcome" || main.type.name =="t")) {
      classLogin="block";
      classHome="none";
    }
    else if(main == undefined){
      classHome="none";
      classLogin="none";
    }
    else{
      classHome = "block";
      classLogin = "none";
    }
    return (
      <Navbar>
      <Navbar.Header>
      <Navbar.Brand >
      <Menu >
      <a id="home" className="menu-item" href="#" onClick={(event) => this.handleClickHome(event)}>Home</a>
      <a href="#" onClick={(event) => this.handleClick2(event)}>Mis clubes de lectura</a>
      <a id="contact" className="menu-item" href="/contact">Contact</a>
      <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
      </Navbar.Brand>
      </Navbar.Header>
      <Link to="/">BookConnect</Link>

      <Nav className="account">
      <NavItem className={classLogin} onClick={(event) => this.handleClick(event)}>Login/SignUp</NavItem>
      <MenuItem divider />
      </Nav>
      <div className={classHome}>
      <Account></Account>
      </div>
      </Navbar>
      );
  }
  handleClick(event){
    var login=[];
    login.push(<LoginScreen appContext ={this.props.appContext} />);
    this.props.appContext.setState({mainPage:[],loginPage:login});
  }
  handleClick2(event){
    var clubs=[];
    clubs.push(<Clubs appContext ={this.props.appContext} userId = {this.props.userId}/>);
    this.props.appContext.setState({mainPage:clubs,loginPage:[]});
  }
  handleClickHome(event){
    var home=[];
    home.push(<HomePage appContext ={this.props.appContext}/>);
    this.props.appContext.setState({mainPage:home, loginPage:[]});
  }
}

export default Header
