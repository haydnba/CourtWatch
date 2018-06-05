/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';

const Hearings = (props) => {
  const { hearings } = props;
  console.log(hearings)

  const listItems = hearings.map(item =>
    (<li key={item.admin_id}>
      <p>{item.date}</p>
      <h4><Link to={'/hearing/' + item.admin_id}> {item.court_name}</Link></h4>
      {/* <p>{item.addresses[0].postcode}</p> */}
    </li >));

  return (
    <ul>{listItems}</ul>
  );
};

export default Hearings;
