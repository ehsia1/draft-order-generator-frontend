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
import s from './Leagues.css';

class Leagues extends React.Component {
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

  }

  render() {
    return <div>
      <h1>{this.props.title}</h1>
    </div>
  }

}

export default withStyles(s)(Leagues);
