import React, { Component } from 'react';
import './../css/App.css';

import {  Route,  Switch, Redirect} from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { firebaseAuth } from '../config/constants'

//Comps
import NavigationBar from './../components/navbar.js'
import HomePage from './HomePage'
import ContactMe from './ContactMe.js'
import PortfolioPage from './../scenes/PortfolioPage'
import ChatPage from './../scenes/ChatPage'
import MangaReader from './../scenes/MangaReader'
import MangaRaderPage from './../scenes/MangaReaderPage'
import Dashboard from './../scenes/Dashboard'
import { connect } from 'react-redux'
import './../css/BootstrapOverride.css';

class App extends Component {
  state = {
    authed: false,
    loading: true,
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    return (
      <div>
        <NavigationBar authed={this.state.authed} store={this.props}/>


        <div className="centered-container">
          <Switch >
              <Route exact path='/' render={()=><HomePage store={this.props}/>}/>
              <Route path='/contact' render={()=><ContactMe store={this.props}/>}/>
              <Route path='/portfolio' render={()=><PortfolioPage store={this.props}/>}/>
              <Route path='/chat' render={()=><ChatPage store={this.props}/>}/>
              <Route exact path='/mangareader' render={()=><MangaReader store={this.props}/>}/>
              <Route path='/mangareader/:manga/:volume/:page' render={(props)=><MangaRaderPage {...props} mangaData={this.props.data.mangaDb}/>}/>;
              <Route path='/dashboard' render={() => this.state.authed === true
                  ? <Dashboard />
                  : <Redirect to={{pathname: '/', state: {from: this.props.location}}} />}
              />;
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      data: state.data.data,
      lang: state.data.lang
  };
};

export default withRouter(connect(mapStateToProps)(App))