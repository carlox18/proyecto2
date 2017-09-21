import React from 'react';
import FlipMove from 'react-flip-move';
import {shuffle} from 'lodash';
import './stylesheets/base.css';


import * as query from './getData';
import HeaderButtons from './HeaderButtons';
import ClubList from './ClubList';


class AllClubs extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        removedClubs: [],
        clubs: [],
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
      const sortAsc  = (a, b) => parseInt(a.name, 10) - parseInt(b.name, 10);
      const sortDesc = (a, b) => parseInt(b.name, 10) - parseInt(a.name, 10);

      this.setState({
        order: (this.state.order === 'asc' ? 'desc' : 'asc'),
        sortingMethod: 'chronological',
        clubs: this.state.clubs.sort(this.state.order === 'asc' ? sortDesc : sortAsc),
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

      this.serverRequest = query.getData(url, (clubsData) => {
        this.setState({ clubs: clubsData });
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

    moveClub(source, dest, index = 0) {
      if (this.state.inProgress) return;

      let sourceClubs = this.state[source].slice();
      let destClubs = this.state[dest].slice();

      if (!sourceClubs.length) return;

      destClubs = [].concat(sourceClubs.splice(index, 1), destClubs);

      this.setState({
        [source]: sourceClubs,
        [dest]:   destClubs,
        inProgress: true,
      });
    }

    renderClubs() {
      const { clubs, view } = this.state;

      return clubs.map((club, i) => {
        return (
          <ClubList
            key = {club.id}
            appContext = {this.props.appContext}
            userId = {this.props.userId}
            view = {view}
            index= {i}
            clickHandler ={() => this.moveClub('clubs', 'removedClubs', i)}
            {...club}
          />
        );
      });
    }

    sortShuffle() {
      this.setState({
        sortingMethod: 'shuffle',
        clubs: shuffle(this.state.clubs),
      });
    }

    render() {
      const { view, order, sortingMethod, series } = this.state;
      return (
        <div id="shuffle" className={view}>
          <HeaderButtons
            view = {view}
            order = {order}
            sortingMethod = {sortingMethod}
            listClickHandler = {this.toggleList}
            gridClickHandler = {this.toggleGrid}
            sortClickHandler = {this.toggleSort}
            shuffleClickHandler = {this.sortShuffle}
            refreshClickHandlder = {this.refresh}
          />
          <div className="dropdown-spacer" style={{ height: 10 }} />
          <h1>Clubes de Lectura</h1>
          <ul>
            <FlipMove
              staggerDurationBy="30"
              duration={500}
              onFinishAll={() => {
                // TODO: Remove the setTimeout, when the bug is fixed.
                setTimeout(() => this.setState({ inProgress: false }), 1);
              }}>
              { this.renderClubs() }
            </FlipMove>
          </ul>
        </div>
      );
    }
}

export default AllClubs;