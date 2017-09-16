import React, { Component } from 'react';
import './../css/App.css';

import {  Route,  Switch} from 'react-router-dom';
import { withRouter } from 'react-router-dom'

//Comps
import NavigationBar from './../components/navbar.js'
import HomePage from './HomePage'
import AboutMePage from './../scenes/AboutMePage'
import PortfolioPage from './../scenes/PortfolioPage'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar store={this.props}/>
        <div className="container">
          <Switch >
              <Route exact path='/' render={()=><HomePage store={this.props}/>}/>
              <Route path='/aboutme' render={()=><AboutMePage store={this.props}/>}/>
              <Route path='/portfolio' render={()=><PortfolioPage store={this.props}/>}/>
              <Route render={()=><HomePage store={this.props}/>}/>
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
// const mapDispatchToProps = (dispatch) => {
//   return {
//       fetchData: (url) => dispatch(itemsFetchData(url))
//   };
// };

// export default App;
