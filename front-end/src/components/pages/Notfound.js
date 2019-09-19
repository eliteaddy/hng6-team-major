import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Notfound extends Component {
  render() {
    return (
      <div>
        <h3>Page Not Found</h3>
        <p>Go back <Link exact to="/">home</Link></p>
      </div>
    )
  }
}

export default Notfound;