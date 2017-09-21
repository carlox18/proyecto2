import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from "./components/App.js";


import { BrowserRouter} from 'react-router-dom';


// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();


ReactDOM.render((
	<MuiThemeProvider muiTheme={getMuiTheme()}>
	<BrowserRouter>
	<App />
	</BrowserRouter>	
	</MuiThemeProvider>), document.getElementById('root'));
registerServiceWorker();
