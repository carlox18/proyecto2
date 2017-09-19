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

class ClubList extends React.Component {
  render() {
    const { _id,nombre, desc, keywords, ids_admin, members, messages } = this.props;
    const listClass = `list-item card`;
    const style = { zIndex: 100 - this.props.index};
    console.log(messages)
    if(messages && messages.length > 0){
      var text = messages[0].text;
    }
    return (
      <li id={_id} href="#" onClick={(event) => this.handleClick(event)} className={listClass} style={style}>
        <span>
          <div className="robot-mug">
            <h1 className="robot-name">{nombre}</h1>                                   
          </div>          
          <div className="robot-info">            
            <h2 className="robot-weapon">Descripción</h2>
            <div>{desc}</div>            
            <h2 className="robot-weakness">Palabras clave</h2>
            <div>{keywords}</div>
          </div>
          <div className="robot-other">
            <h1 className="robot-serial">Último mensaje</h1> <div>{text}</div>   
          </div>
          <button onClick={this.props.clickHandler}>
            <i className="fa fa-close"/>
          </button>
          <div className="clearfix"/>
        </span>
      </li>
    );
  }
  handleClick(event){
    var chat=[];
    console.log(this.props);
    chat.push(<Chat _id ={this.props._id} nombre={this.props.nombre} desc={this.props.desc} keywords = {this.props.keywords} ids_admin={this.props.ids_admin}
      members = {this.props.members} messages={this.props.messages} userId = {this.props.userId}/>);
    this.props.appContext.setState({mainPage:chat});
  }

}

RobotMaster.PropTypes = propTypes;

export default ClubList;