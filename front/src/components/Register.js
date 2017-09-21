import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login';
import axios from 'axios';
import Clubs from "./Clubs";



class Register extends Component {
  constructor(props){
    super(props);
      this.state={
        name:'',
        email:'',
        password:''
      }
    }
    render() {
      return (
        <div>
        <MuiThemeProvider>
        <div>
        <TextField
        hintText="Enter your full Name"
        floatingLabelText="Full name"
        onChange = {(event,newValue) => this.setState({name:newValue})}
        />
        <br/>
        <br/>
        <TextField
        hintText="Enter your Email"
        type="email"
        floatingLabelText="Email"
        onChange = {(event,newValue) => this.setState({email:newValue})}
        />
        <br/>
        <TextField
        type = "password"
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
        var apiBaseUrl = "/users";
        var self = this;
        var payload={
          "name": this.state.name,
          "email":this.state.email,
          "password":this.state.password
        }
        axios.post(apiBaseUrl, payload)
          .then(function (response) {
           console.log(response);
             if(response.status == 200){
              window.alert("Signup successful");
              var home=[];
              home.push(<Clubs userId={response.data._id}/>);
              self.props.appContext.setState({loginPage:[],mainPage:home,userId:response.data._id,email:response.data.email,name:response.data.name});
            }
            else{
              window.alert("Error signing up");
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
    export default Register;