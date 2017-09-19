import React from 'react';
import './App.css';
import Header from "./Header";
import Main from "./Main";

// HomePage y LoginScreen se importan pero nunca se utilizaban.

import Welcome from "./Welcome";


class App extends React.Component {
	constructor(props){
		super(props);
		this.state={
			mainPage:[],
			loginPage:[],
			userId:"",
		}
	}
	componentWillMount(){
    var welcomePage =[];
    welcomePage.push(<Welcome appContext={this}/>);
    this.setState({
                  mainPage:welcomePage
                    })
  }

	render() {
			return (<div>
			<Main/>
				<Header appContext={this} userId ={this.state.userId} />
				{this.state.mainPage}
				{this.state.loginPage}
				</div>
				)
		}
}
export default App;
