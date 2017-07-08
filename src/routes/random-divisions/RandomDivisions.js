/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RandomDivisions.css';

class RandomDivisions extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      input: [],
      numPlayer: 0,
      players: [],
      order: [],
      divisions: {},
      display: {},
    }
    this.handleClick = this.handleClick.bind(this);
    this.getDivisions = this.getDivisions.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Pick Divisions</h1>
        Please enter the players in your league below:<br/><br/>
        {this.state.input}<br/>
        <button onClick={this.handleClick} >Add Player</button><br/><br/>
        <button onClick={this.getDivisions} >Submit Players</button><br/><br/><br/>
        <ul>
          {this.state.players.map(player => <li>{player}</li>)}
        </ul>
        <table className="table">
          <thead>
            <tr>
              <th>East</th>
              <th>West</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(this.state.display).map(([east, west]) => <tr><td>{east}</td><td>{west}</td></tr>)}
          </tbody>
        </table>
      </div>
    );
  }

  handleClick(event) {
    event.preventDefault();
    var count = this.state.numPlayer;
    var boxes = this.state.input;
    var input = (<div>
      <label>Player {count+1}:</label><br/>
      <input type="text" id={count} /><br/>
    </div>);
    boxes.push(input);
    count++;
    this.setState({input: boxes});
    this.setState({numPlayer: count});
  }

  getDivisions(event) {
    event.preventDefault();
    var arr = [];
    for (var i = 0; i < this.state.numPlayer; i++) {
      var guy = document.getElementById(i).value;
      arr.push(guy);
    }
    this.setState({players: arr}, function () {
      var url = 'http://localhost:6095/divisions-completely-random?';
      this.state.players.forEach(player => {
        url += 'names[]=';
        url += player;
        url += '&';
      });
      url = url.substring(0, url.length-1);
      fetch(url, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(response => {
        this.setState({divisions: response}, function () {
          var object = {};
          for (var i = 0; i < this.state.divisions.east.length; i++) {
            object[this.state.divisions.east[i]] = this.state.divisions.west[i];
          }
          this.setState({display: object});
        });
      })
      .catch(err => console.log(err));
    });
  }
}

export default withStyles(s)(RandomDivisions);
