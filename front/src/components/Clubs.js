import React from 'react';
import FlipMove from 'react-flip-move';
import {shuffle} from 'lodash';
import './stylesheets/base.css';
import Chat from"./Chat";
import "./HomePage.css"


import * as query from './getData';
import HeaderButtons from './HeaderButtons';
import ClubChat from './ClubChat';


class Clubs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      removedClubChats: [],
      clubChats: [],
      chat:[],
      view: 'list',
      order: 'asc',
      sortingMethod: 'chronological',
      enterLeaveAnimation: 'accordianHorizontal',
      inProgress: false,
    };

    this.sortShuffle = this.sortShuffle.bind(this);
    this.toggleSort  = this.toggleSort.bind(this);
    this.toggleList  = this.toggleList.bind(this);
    this.refresh     = this.refresh.bind(this);
  }

  toggleSort() {
    const sortAsc  = (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10);
    const sortDesc = (a, b) => parseInt(b.id, 10) - parseInt(a.id, 10);

    this.setState({
      order: (this.state.order === 'asc' ? 'desc' : 'asc'),
      sortingMethod: 'chronological',
      clubChats: this.state.clubChats.sort(this.state.order === 'asc' ? sortDesc : sortAsc),
    });
  }

  selectSeries(e) {
      //Need more elegant way than e.target.textContent
      if (this.state.selectedSeries === e.target.textContent) return;

      this.setState({
        selectedSeries: e.target.textContent,
      });
    }

    toggleList() {
      this.setState({
        view: 'list',
        enterLeaveAnimation: 'accordianVertical',
      });
    }

    refresh() {
      this.getData();
    }

    componentDidMount() {
      this.getData();
    }

    getData() {
      const url = "/clubs";
      var self = this;
      this.serverRequest = query.getData(url, (clubsData) => {
        var clubs = clubsData.filter(function(club){
          return club.members == undefined ? false : club.members.includes(self.props.userId);
        });
        this.setState({ clubChats: clubs });
      });
}

componentWillUnmount() {
 if(!this.serverRequest&&this.serverRequest !== undefined){
  this.serverRequest.abort();
}
}

componentDidUpdate(prevProps, prevState) {
  if (this.state.selectedSeries !== prevState.selectedSeries) {
    this.getData();
  }
}

moveClubChat(source, dest, index = 0) {
  if (this.state.inProgress) return;

  let sourceClubChats = this.state[source].slice();
  let destClubChats = this.state[dest].slice();

  if (!sourceClubChats.length) return;

  destClubChats = [].concat(sourceClubChats.splice(index, 1), destClubChats);

  this.setState({
    [source]: sourceClubChats,
    [dest]:   destClubChats,
    inProgress: true,
  });
}

renderClubChats() {
  const { clubChats, view } = this.state;
  return clubChats.map((clubChat, i) => {
    return (
      <ClubChat
      key = {clubChat.id}
      appContext = {this.props.appContext}
      userId = {this.props.userId}
      parentContext = {this}
      view = {view}
      index= {i}
      clickHandler ={() => this.moveClubChat('clubChats', 'removedClubChats', i)}
      {...clubChat}
      />
      );
  });
}


sortShuffle() {
  this.setState({
    sortingMethod: 'shuffle',
    clubChats: shuffle(this.state.clubChats),
  });
}

render() {
  const { view, order, sortingMethod, series, chat } = this.state;
  if(this.state.clubChats.length > 0)
    return (
      <div className="container1 clearfix">
      <h1>Clubes de Lectura</h1>
      <div className="people-list" id="people-list">
      <ul className="list">

      { this.renderClubChats() }
      </ul>
      </div>
      {this.state.chat}

      </div>
      );
  return(
    <div>No estás en ningún club. Ve a la lista de clubes y únete!</div>
    )
}
}

export default Clubs;