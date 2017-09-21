import React from 'react';
import PropTypes from "prop-types";
import Chat from "./Chat";

const propTypes = {
  _id: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  desc: PropTypes.string,
  keywords: PropTypes.object,
  ids_admin: PropTypes.object,
  members: PropTypes.object,
  messages: PropTypes.object,
};

class Club extends React.Component {
  render() {
    const { _id,nombre, desc, keywords, ids_admin, members, messages } = this.props;
    const listClass = `list-item card`;
    const style = { zIndex: 100 - this.props.index};
    if(messages && messages.length > 0){
      var text = messages[messages.length - 1].text;
    }
    return (
      <li id={_id} href="#" onClick={(event) => this.handleClick(event)} className={listClass} style={style}>
        <span>
          <div className="club-mug">
            <h1 className="club-name">{nombre}</h1>                                   
          </div>          
          <div className="club-info">            
            <h2 className="club-weapon">Descripción</h2>
            <div>{desc}</div>            
            <h3 className="club-weakness">Palabras clave</h3>
            <div>{keywords}</div>
          </div>
          <div className="club-other">
            <h2 className="club-serial">Último mensaje</h2> <div>{text}</div>   
          </div>
          <button onClick={this.props.clickHandler}>
            <i className="fa fa-close"/>
          </button>
          <div className="clearfix"/>
        </span>
      </li>
    );
  }

}

Club.PropTypes = propTypes;

export default Club;