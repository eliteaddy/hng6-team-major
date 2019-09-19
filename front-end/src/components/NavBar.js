import React from 'react';
import {NavLink} from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink as Link,
  NavItem } from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md" className="fixed-top">
          <NavbarBrand href="/">HelloReact</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link>
                  <NavLink exact className="nava" activeClassName="active" to="/">
                    Home
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link>
                  <NavLink className="nava" activeClassName="active" to="/about">
                    About
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link>
                  <NavLink className="nava" activeClassName="active" to="/contact">
                    Contact
                  </NavLink>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;