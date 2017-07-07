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
import s from './DraftOrder.css';

class DraftOrder extends React.Component {
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
      draftOrder: {},
    }
    this.handleClick = this.handleClick.bind(this);
    this.getDraftOrder = this.getDraftOrder.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Draft Order</h1>
        Please enter the players in your league below:<br/><br/>
        {this.state.input}<br/>
        <button onClick={this.handleClick} >Add Player</button><br/><br/>
        <button onClick={this.getDraftOrder} >Submit Players</button><br/>
        <table className="table">
          <thead>
            <tr>
              <th>Players (Before Draft Order)</th>
              <th>After Randomization</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(this.state.draftOrder).map(([before, after]) => <tr><td>{before}</td><td>{after}</td></tr>)}
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

  getDraftOrder(event) {
    event.preventDefault();
    var arr = [];
    for (var i = 0; i < this.state.numPlayer; i++) {
      var guy = document.getElementById(i).value;
      arr.push(guy);
    }
    this.setState({players: arr}, function () {
      var url = 'http://localhost:6095/fantasy-football-draft-order?';
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
        this.setState({order: response}, function () {
          var object = {};
          for (var i = 0; i < this.state.numPlayer; i++) {
            object[arr[i]] = response[i];
          }
          this.setState({draftOrder: object})
        });
      })
      .catch(err => console.log(err));
    });
  }
}

export default withStyles(s)(DraftOrder);
