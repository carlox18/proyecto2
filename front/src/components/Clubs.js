import React from 'react';
import FlipMove from 'react-flip-move';
import {shuffle} from 'lodash';
import './stylesheets/base.css';
import Chat from"./Chat";


import * as query from './getData';
import HeaderButtons from './HeaderButtons';
import RobotMaster from './RobotMaster';


class Clubs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      removedRobotMasters: [],
      robotMasters: [],
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
      robotMasters: this.state.robotMasters.sort(this.state.order === 'asc' ? sortDesc : sortAsc),
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
      this.setState({})
    }

    getData() {
      const url = "/clubs";

      this.serverRequest = query.getData(url, (clubsData) => {
        this.setState({ robotMasters: clubsData });
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

    moveRobotMaster(source, dest, index = 0) {
      if (this.state.inProgress) return;

      let sourceRobotMasters = this.state[source].slice();
      let destRobotMasters = this.state[dest].slice();

      if (!sourceRobotMasters.length) return;

      destRobotMasters = [].concat(sourceRobotMasters.splice(index, 1), destRobotMasters);

      this.setState({
        [source]: sourceRobotMasters,
        [dest]:   destRobotMasters,
        inProgress: true,
      });
    }

    renderRobotMasters() {
      const { robotMasters, view } = this.state;

      return robotMasters.map((robot, i) => {
        return (
          <RobotMaster
          key = {robot.id}
          appContext = {this.props.appContext}
          userId = {this.props.userId}
          parentContext = {this}
          view = {view}
          index= {i}
          clickHandler ={() => this.moveRobotMaster('robotMasters', 'removedRobotMasters', i)}
          {...robot}
          />
          );
      });
    }

    sortShuffle() {
      this.setState({
        sortingMethod: 'shuffle',
        robotMasters: shuffle(this.state.robotMasters),
      });
    }

    render() {
      const { view, order, sortingMethod, series, chat } = this.state;
      return (
        <div className="container1 clearfix">
        <h1>Clubes de Lectura</h1>
        <div className="people-list" id="people-list">
        <ul className="list">

        { this.renderRobotMasters() }
        </ul>
        </div>
        {this.state.chat}

          </div>
        );
    }
  }

  export default Clubs;