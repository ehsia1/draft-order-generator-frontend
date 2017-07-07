/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import DraftOrder from './DraftOrder';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const title = 'Pick the Draft Order'
  return {
    title: title,
    component: <Layout><DraftOrder title={title}/></Layout>
  }
}

export default action;
