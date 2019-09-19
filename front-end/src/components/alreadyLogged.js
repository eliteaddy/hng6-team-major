import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import cookie from "react-cookies";

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    }

    componentDidMount() {
      var present = cookie.load("x-user-logged");
      // var store = localStorage.getItem('users');
      if (!present) {
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false, redirect: true });
      }
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}
