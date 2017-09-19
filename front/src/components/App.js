import React from 'react';
import './App.css';
import Header from "./Header";
import Main from "./Main";
import LoginScreen from '../containers/LoginScreen';
import HomePage from "./HomePage";
import Welcome from "./Welcome";
import Clubs from "./Clubs";


class App extends React.Component {
	constructor(props){
		super(props);
		this.state={
			loginPage:[],
			userId:null,
			mainPage:[],
			name:"",
			email:""
		}
	}
  deleteUser(){
  	this.setState({
  		userId:null
  	})
  }

	render() {
			return (<div>
			<Main/>
				<Header appContext={this} userId ={this.state.userId} deleteUser={this.deleteUser.bind(this)} name={this.state.name} email={this.state.email}/>
				{!this.state.userId && this.state.loginPage.length==0 && <Welcome appContext={this}/>}
				{this.state.userId && this.state.mainPage}
				{this.state.loginPage}
				</div>
				)
		}
		
}

export default App;
