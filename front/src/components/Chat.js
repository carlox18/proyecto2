import React from 'react';
import Header from "./Header";
import PropTypes from "prop-types";
import Main from "./Main";
import axios from 'axios';


const propTypes = {
	_id: PropTypes.string.isRequired,
	nombre: PropTypes.string.isRequired,
	desc: PropTypes.string,
	keywords: PropTypes.object,
	ids_admin: PropTypes.object,
	members: PropTypes.object,
	messages: PropTypes.object,
};

class Chat extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			mensajes:this.props.messages
		}
	}
	componentDidMount() {
		var element = document.getElementsByClassName("chat-history")[0];
		element.scrollTop = element.scrollHeight;
	}
	render() {
		const { _id,nombre, desc, keywords, ids_admin, members } = this.props;
		const listClass = `list-item card`;
		const style = { zIndex: 100 - this.props.index};
		const self = this;
		var messages = this.state.mensajes;
		if(messages == undefined)
			messages = [];
		return (
			<div className="chat">
			<div className="chat-header clearfix">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
			<div className="chat-about">
			<div className="chat-with">{nombre}</div>
			<div className="chat-num-messages">{desc}</div>
			</div>
			<i className="fa fa-star" />
			</div> 
			<div className="chat-history">
			<ul>
			{messages.map(function(msg, index){
				if( msg.sender == self.props.userId){
					return(
						<li className="clearfix">
						<div className="message-data align-right">
						<span className="message-data-time"></span> &nbsp; &nbsp;
						<span className="message-data-name">{msg.sender_name}</span> <i className="fa fa-circle me" />
						</div>
						<div className="message other-message float-right">
						{msg.text}
						</div>
						</li>)
				}
				else{
					return(
						<li>
						<div className="message-data">
						<span className="message-data-name"><i className="fa fa-circle online" /> {msg.sender_name}</span>
						<span className="message-data-time">10:12 AM, Today</span>
						</div>
						<div className="message my-message">
						{msg.text}
						</div>
						</li>
						)
				}
			})}
			</ul>

			</div> 
			<div className="chat-message clearfix">
			<textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows={3} defaultValue={""} />
			<i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
			<i className="fa fa-file-image-o" />
			<button onClick={(event) => this.handleClick(event)}>Send</button>
			</div> 
			</div>
			);
	}	
	handleClick(event){
		var elem = document.getElementById("message-to-send");
		var x = elem.value;
		var apiBaseUrl = "/clubs/"+this.props._id+"/messages";
		var self = this;
		console.log(x + "---" + apiBaseUrl);
		var payload={
			sender: self.props.userId,
			text:x
		}
		axios.post(apiBaseUrl, payload)
		.then(function (response) {
			console.log(response)
			if(response.status == 200){
				elem.value="";
				self.setState({mensajes:response.data});

			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}


Chat.PropTypes = propTypes;

export default Chat;
