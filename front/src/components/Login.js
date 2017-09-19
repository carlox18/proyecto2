import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React from 'react';
import axios from 'axios';
import App from "./App";
import HomePage from "./HomePage";
import Clubs from "./Clubs";


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
  }
  render() {
    return (
      <div>
      <MuiThemeProvider>
      <div>
      <TextField
      hintText="Enter your Username"
      floatingLabelText="Username"
      onChange = {(event,newValue) => this.setState({username:newValue})}
      />
      <br/>
      <TextField
      type="password"
      hintText="Enter your Password"
      floatingLabelText="Password"
      onChange = {(event,newValue) => this.setState({password:newValue})}
      />
      <br/>
      <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
      </div>
      </MuiThemeProvider>
      </div>
      );
  }
  handleClick(event){
    var apiBaseUrl = "/users/login";
    var self = this;
    var payload={
     "email":this.state.username,
     "password":this.state.password
   }
   axios.post(apiBaseUrl, payload)
   .then(function (response) {
    console.log(response)
    if(response.status == 200 && response.data != null){
     window.alert("Login successful");
     var home=[];
     home.push(<Clubs userId={response.data._id}/>);
     self.props.appContext.setState({loginPage:[],mainPage:home,userId:response.data._id});
   }
   else if(response.status == 204){
     console.log("Username password do not match");
     window.alert("username password do not match")
   }
   else{
     console.log("Username does not exist");
     window.alert("Username does not exist");
   }
 })
   .catch(function (error) {
     console.log(error);
   });
 }
}
const style = {
 margin: 15,
};
export default Login;