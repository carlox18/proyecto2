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

class ClubChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: this.props._id,
      nombre:this.props.nombre,
      desc:this.props.desc,
      keywords:this.props.keywords,
      ids_admin:this.props.ids_admin,
      members:this.props.members,
      messages:this.props.messages,
      userId:this.props.userId
    }
  };

  render() {
    const { _id,nombre, desc, keywords, ids_admin, members, messages } = this.props;
    const listClass = `list-item card`;
    const style = { zIndex: 100 - this.props.index};

    return (
      <li className="clearfix" onClick={(event) => this.handleClick(event)}>
      <img src="" />
      <div className="name">{nombre}
      <div className="status">
      <i className="fa fa-circle online" /> online
      </div>
      </div>
      </li>     
      );
    
  }
  handleClick(event){
    var chat=[];
    var mensajes = this.state.messages!=undefined ? this.state.messages : [];
    chat.push(<Chat _id ={this.state._id} nombre={this.state.nombre} desc={this.state.desc} keywords = {this.state.keywords} ids_admin={this.state.ids_admin}
      members = {this.state.members} messages={mensajes} userId = {this.state.userId}/>)
    this.props.parentContext.setState({chat:chat});
  }

}

ClubChat.PropTypes = propTypes;

export default ClubChat;
