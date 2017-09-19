import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginScreen from '../containers/LoginScreen';

// Clubs nunca se utilizaba.

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends React.Component {
		componentWillMount(){
		this.setState({
		})
	}
		render() {
			return (
    <Switch>
      <Route path='/logscreen' component={LoginScreen} parentContext={this.props.parentContext} appContext={this.props.appContext}/>
    </Switch>
)
}
}
export default Main
