import React from 'react'
import './Welcome.css';



/////////////////
/// COMPONENTS //
/////////////////

// Container
class Welcome extends React.Component{
    
    render() {
        
    
        
        return (
                <div id="hero" className="Hero" style={{backgroundImage: 'url(https://itbok.files.wordpress.com/2011/03/shutterstock_20850556_resize.jpg)'}}>
                <div className="content">
                    <h1> Tu Club de Lectura Virtual</h1>
                    <h2>Para el ávido lector</h2>
                    <p>Crea, maneja y participa en los mejores clubes de lectura virtuales!.</p>
                    <div className="button-wrapper">
                        <HeroButton primary={true} text="Accede ahora" />
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
        );
    }
};

// Hero Button
class HeroButton extends React.Component{
    render() {
        return (
            <a className="Button" data-primary={this.props.primary}>{this.props.text}</a>
        );
    }
}




export default Welcome
