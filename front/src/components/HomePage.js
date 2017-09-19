import React from 'react';
import './HomePage.css';

// Header y Main nunca se usaban.

class HomePage extends React.Component {
	constructor(props){
		super(props);
		this.state={
			mainPage:[],
			clubPage:[]
		}
	}

	render() {
		return(<div>¡Bienvenido!
			<div>Vemos que no tienes ningún grupo, usa el menú de la izquierda y encuentra tus clubes de lectura favoritos!
			</div>	
			</div>
			)	
	}
}
export default HomePage;
