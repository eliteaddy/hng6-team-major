import React, { Component } from "react";
import cookie from "react-cookies";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      firstname: "",
      lastname: ""
    };
  }

  componentDidMount() {
    var store = JSON.parse(localStorage.getItem("x-users-logged"));
    // console.log(store);
    this.setState({
      email: store.email,
      username: store.username,
      firstname: store.firstname,
      lastname: store.lastname
    });
  }

  handleLogout = () => {
    localStorage.clear("x-users-logged");
    cookie.remove("x-user-logged", { path: "/" });
    this.props.history.push("/login");
  };

  render() {
    const { email, username, firstname, lastname } = this.state;
    return (
      <div className="text-center">
        <h1>Dashboard</h1>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Full Name: {`${firstname} ${lastname}`}</p>
        <button className="btn btn-yellow" onClick={this.handleLogout}>
          Log Out
        </button>
      </div>
    );
  }
}

export default Dashboard;
