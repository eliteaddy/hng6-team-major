import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  let fStyle = {
    margin: 0,
    padding: 3
  }

  return (
    <div style={fStyle} className='p-5 mt-3 bg-dark footer text-center'>
      <div className="text-center">
        <ul>
          <li className="footlink">
            <NavLink exact activeClassName="active" to="/">
              Home
            </NavLink>
          </li>
          {" | "}
          <li className="footlink">
            <NavLink activeClassName="active" to="/about">
              About
            </NavLink>
          </li>
          {" | "}
          <li className="footlink">
            <NavLink activeClassName="active" to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer;