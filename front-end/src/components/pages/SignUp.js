import React, { Component } from "react";
import API from "../api";
import { Link, Redirect } from "react-router-dom";
import cookie from "react-cookies";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      userName: "",
      firstName: "",
      lastName: "",
      error: [],
      confirmPassword: "",
      loading: true,
      redirect: false
    };
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    var present = cookie.load("x-user-logged");
    // var store = localStorage.getItem('users');
    if (!present) {
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false, redirect: true });
    }
  }

  handleSubmit = e => {
    const {
      email,
      userName,
      password,
      confirmPassword,
      firstName,
      lastName
    } = this.state;
    const data = {
      email,
      userName,
      password,
      confirmPassword,
      firstName,
      lastName
    };
    console.log(data);
    e.preventDefault();
    API.post("/api/v1/auth/signup", data).then(
      res => {
        // console.log(res.data);
        cookie.save("x-user-logged", res.data.data.email, { path: "/" });
        localStorage.setItem("x-users-logged", JSON.stringify(res.data.data));
        this.props.history.push("/");
        // location.replace("/");
      },
      err => {
        // console.error(err.response.data.error);
        var errors = err.response.data.error;
        console.log(errors);
        this.setState({ error: errors });
      }
    );
  };

  render() {
    const { loading, redirect } = this.state;
    if (loading) {
      return null;
    }
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="container">
          <br />
          <br />
          <div className="card">
            <div className="row d-flex justify-content-center ">
              <div className="col-md-4 ">
                <div className="side-image text-center">
                  <br />
                  <h4 className="team">
                    team<span>Major</span>
                  </h4>
                  <br />
                  <div className="welcome mt-5">Welcome!</div>
                  <div className="line mb-4" />
                  <p>
                    Already have an account?
                    <br />
                    Login to view your personal profile
                  </p>
                  <Link to="/login">
                    <button type="button" className="btn">
                      SIGN IN
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-4 ">
                <div className="panel panel-default">
                  <div className="panel-heading text-center">
                    <strong>
                      {" "}
                      <h2>Create an Account</h2>{" "}
                    </strong>
                    <div className="line mb-4" />
                    <p>
                      Sign Up today to enjoy the benefits of
                      <br />
                      being a member
                    </p>
                  </div>
                  <div className="panel-body">
                    <form onSubmit={this.handleSubmit}>
                      <br />
                      {this.state.error.map(err => {
                        return (
                          <p style={{ color: "#E21B1B" }}>
                            <small>{err}</small>
                          </p>
                        );
                      })}
                      <h6>
                        First Name <span>*</span>
                      </h6>
                      <div className="form-group input-group">
                        {/* <span class="input-group-addon"><i class="fa fa-tag"  ></i></span> */}
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          placeholder="Enter your first name"
                          style={{ fontSize: "14px" }}
                          value={this.state.firstName}
                          onChange={this.handleChange}
                        />
                      </div>
                      <h6>
                        Last Name <span>*</span>
                      </h6>
                      <div className="form-group input-group">
                        {/* <span class="input-group-addon"><i class="fa fa-tag"  ></i></span> */}
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          placeholder="Enter your last name"
                          style={{ fontSize: "14px" }}
                          value={this.state.lastName}
                          onChange={this.handleChange}
                        />
                      </div>
                      <h6>
                        Email <span>*</span>
                      </h6>
                      <div className="form-group input-group">
                        {/* <span class="input-group-addon"><i class="fa fa-tag"  ></i></span> */}
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          placeholder="Enter your Email address"
                          style={{ fontSize: "14px" }}
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </div>
                      <h6>
                        Username <span>*</span>
                      </h6>
                      <div className="form-group input-group">
                        {/* <span class="input-group-addon"><i class="fa fa-tag"  ></i></span> */}
                        <input
                          type="text"
                          className="form-control"
                          name="userName"
                          placeholder="Enter your username"
                          style={{ fontSize: "14px" }}
                          value={this.state.userName}
                          onChange={this.handleChange}
                        />
                      </div>
                      <h6>
                        Password <span>*</span>
                      </h6>
                      <div className="form-group input-group">
                        {/* <span class="input-group-addon"><i class="fa fa-lock"  ></i></span> */}
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter your Password "
                          style={{ fontSize: "14px" }}
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                        <span>
                          {" "}
                          <i
                            className="fa fa-eye-slash"
                            aria-hidden="true"
                          />{" "}
                        </span>
                      </div>
                      <h6>
                        Confirm Password <span>*</span>
                      </h6>
                      <div className="form-group input-group">
                        {/* <span class="input-group-addon"><i class="fa fa-lock"  ></i></span> */}
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Retype your Password "
                          style={{ fontSize: "14px" }}
                          name="confirmPassword"
                          value={this.state.confirmPassword}
                          onChange={this.handleChange}
                        />
                        <span>
                          {" "}
                          <i
                            className="fa fa-eye-slash"
                            aria-hidden="true"
                          />{" "}
                        </span>
                      </div>
                      <div className="text-center">
                        <input type="submit" value="SIGN UP" className="btn" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <footer>
          <p>@ 2019. All rights reserved</p>
        </footer>
      </div>
    );
  }
}

export default SignUp;
