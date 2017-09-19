import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from '../components/Login';
import Register from '../components/Register';

// APP Se importa pero nunca se usa

class LoginScreen extends Component {
  constructor(props){
    super(props);

    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:'',
      buttonLabel:'Register', 
      isLogin:true
    }
  }
  componentWillMount(){
    this.props.appContext.setState({welcomePage:[]});
    var loginscreen=[];
    loginscreen.push(<Login parentContext={this} appContext={this.props.appContext}/>);
    var loginmessage = "Not registered yet? Register Now";
    this.setState({
      loginscreen:loginscreen,
      loginmessage:loginmessage
    })
  }
  render() {
    return (
      <div className="loginscreen">
      {this.state.loginscreen}
      <div>
      {this.state.loginmessage}
      <MuiThemeProvider>
      <div>
      <RaisedButton label={this.state.buttonLabel} primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
      </div>
      </MuiThemeProvider>
      </div>
      </div>
      );
  }
  handleClick(event){
    // console.log("event",event);
    var loginmessage;
    if(this.state.isLogin){
      var loginscreen=[];
      loginscreen.push(<Register appContext = {this.props.appContext} parentContext={this}/>);
      loginmessage = "Already registered? Go to Login";
      this.setState({
       loginscreen:loginscreen,
       loginmessage:loginmessage,
       buttonLabel:"Login",
       isLogin:false
     })
    }
    else{
       loginscreen=[];
      loginscreen.push(<Login appContext = {this.props.appContext} parentContext={this}/>);
      loginmessage = "Not Registered yet, Go to registration";
      this.setState({
       loginscreen:loginscreen,
       loginmessage:loginmessage,
       buttonLabel:"Register",
       isLogin:true
     })
    }
  }
}
const style = {
  margin: 15,
};
export default LoginScreen;
