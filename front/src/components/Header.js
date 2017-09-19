import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
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
      <p className="text-left"><strong>{this.props.parentContext.props.name}</strong></p>
      <p className="text-left small">{this.props.parentContext.props.email}</p>
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
      <a href="#" onClick={(event) => this.handleClick(event)} className="btn btn-danger btn-block">Cerrar Sesion</a>
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
  handleClick(event){
    this.props.deleteUser;
  }
};


class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Navbar>
      {this.props.userId && <Navbar.Header>
      <Navbar.Brand >
      <Menu >
      <a id="home" className="menu-item" href="#" onClick={(event) => this.handleClickClubs(event)}>Mis Clubes</a>
      <a href="#" onClick={(event) => this.handleClickExplore(event)}>Explorar</a>
      </Menu>
      </Navbar.Brand>
      </Navbar.Header>}
      <Link to="/">BookConnect</Link>

      <Nav className="account">
      {!this.props.userId && <NavItem onClick={(event) => this.handleClick(event)}>Login/SignUp</NavItem>}
      <MenuItem divider />
      </Nav>
      {this.props.userId && <div><Account deleteUser={this.props.deleteUser} parentContext={this}></Account></div>}
      </Navbar>   
      );
  }
  handleClick(event){
    var login=[];
    login.push(<LoginScreen appContext ={this.props.appContext} />);
    this.props.appContext.setState({mainPage:[],loginPage:login});
  }
  handleClickClubs(event){
    var clubs=[];
    console.log(this.props.userId)
    clubs.push(<Clubs appContext ={this.props.appContext} userId = {this.props.userId}/>);
    this.props.appContext.setState({mainPage:clubs,loginPage:[]});
  }
  handleClickExplore(event){
    var home=[];
    home.push(<HomePage appContext ={this.props.appContext}/>);
    this.props.appContext.setState({mainPage:home, loginPage:[]});
  }
}

export default Header
