import React, { Component } from "react";
import "./../css/App.css";

import { Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { firebaseAuth } from "../config/constants";

//Comps
import NavigationBar from "./../components/navbar.js";
import { connect } from "react-redux";
import "./../css/BootstrapOverride.css";

// Chunking
import Loadable from 'react-loadable';

const LoadableContact = Loadable({
  loader: () => import("./ContactMe.js"),
  loading() {
    return <div>Loading...</div>
  }
});
const LoadableProjects = Loadable({
  loader: () => import("./../scenes/Projects"),
  loading() {
    return <div>Loading...</div>
  }
});
const LoadableChatPage = Loadable({
  loader: () => import("./../scenes/ChatPage"),
  loading() {
    return <div>Loading...</div>
  }
});
const LoadableDashboard = Loadable({
  loader: () => import("./../scenes/Dashboard"),
  loading() {
    return <div>Loading...</div>
  }
});
const LoadableHome = Loadable({
  loader: () => import("./HomePage"),
  loading() {
    return <div>Loading...</div>
  },
  delay: 100, // 0.1 seconds
});

class App extends Component {
  state = {
    authed: false,
    loading: true
  };

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false
        });
      } else {
        this.setState({
          authed: false,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <div>
        <NavigationBar
          authed={this.state.authed}
          local={this.props.local.navbarcomponent}
          lang={this.props.lang}
          loginLocal={this.props.local.logincomponent}
          changeEng={this.props.changeEng}
          changeJap={this.props.changeJap}
        />

        <div className="centered-container">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <LoadableHome
                  local={this.props.local.homePage}
                  lang={this.props.lang}
                />
              )}
            />
            <Route
              path="/contact"
              render={() => (
                <LoadableContact
                  local={this.props.local.contactPage}
                  lang={this.props.lang}
                />
              )}
            />
            <Route
              path="/projects"
              render={() => (
                <LoadableProjects
                  local={this.props.local.projectsPage}
                  lang={this.props.lang}
                />
              )}
            />
            <Route
              path="/chat"
              render={() => <LoadableChatPage store={this.props} />}
            />
            <Route
              path="/dashboard"
              render={() =>
                this.state.authed === true ? (
                  <LoadableDashboard />
                ) : (
                  <Redirect
                    to={{ pathname: "/", state: { from: this.props.location } }}
                  />
                )}
            />;
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data.data,
    local: state.data.local,
    lang: state.data.lang
  };
};

export default withRouter(connect(mapStateToProps)(App));
