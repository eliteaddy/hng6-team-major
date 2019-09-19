import React, { Component } from "react";
import cookie from "react-cookies";
import API from "../api";
import { Link, Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: null,
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

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    API.post("/api/v1/auth/signin", this.state)
      .then(res => {
        // console.log(res.data);
        cookie.save("x-user-logged", res.data.data.email, { path: "/" });
        localStorage.setItem("x-users-logged", JSON.stringify(res.data.data));
        this.props.history.push("/");
        // window.location.replace("/");
      })
      .catch(err => {
        var errors = err.response.data.error;
        console.log(errors);
        this.setState({ error: errors });
      });
    // console.log(e);
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
                    Don't have an account?
                    <br />
                    Sign Up to enjoy benefits as a user
                  </p>
                  <Link to="/signup">
                    <button type="button" className="btn">
                      SIGN UP
                    </button>{" "}
                  </Link>
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-4 ">
                <div
                  className="panel panel-default"
                  style={{ paddingTop: "130px" }}
                >
                  <div className="panel-heading text-center">
                    <strong>
                      {" "}
                      <h2>Login Your Account</h2>{" "}
                    </strong>
                    <div className="line mb-4" />
                    <p>
                      Login to view your personal profile and
                      <br /> enjoy thousands of benefits
                    </p>
                  </div>
                  <div className="panel-body">
                    <form onSubmit={this.handleSubmit}>
                      <br />
                      <p style={{ color: "#E21B1B" }}>
                        <small>{this.state.error}</small>
                      </p>
                      <h6>
                        Email or Username <span>*</span>
                      </h6>
                      <div className="form-group input-group">
                        {/* <span class="input-group-addon"><i class="fa fa-tag"  ></i></span> */}
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          placeholder="Enter Email or Username"
                          style={{ fontSize: "14px" }}
                          value={this.state.email}
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
                      <div className="text-center">
                        <div className="text-center">
                          <input
                            type="submit"
                            value="SIGN IN"
                            className="btn"
                          />
                        </div>
                      </div>
                      <a href="#"> </a>
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

export default Login;
