import React, { Component } from 'react';
import './../css/App.css';

import {  Route,  Switch} from 'react-router-dom';
import { withRouter } from 'react-router-dom'

//Comps
import NavigationBar from './../components/navbar.js'
import HomePage from './HomePage'
import AboutMePage from './../scenes/AboutMePage'
import PortfolioPage from './../scenes/PortfolioPage'
import ChatPage from './../scenes/ChatPage'
import MangaReader from './../scenes/MangaReader'
import MangaRaderPage from './../scenes/MangaReaderPage'
import { connect } from 'react-redux'
import UnderConstructionNot from './../components/UnderConstructionNot'

import styles from './../css/BootstrapOverride.css';

class App extends Component {
  render() {
    return (
      <div className={styles}>
        <NavigationBar store={this.props}/>
        <div className="container">
          <Switch >
              <Route exact path='/' render={()=><HomePage store={this.props}/>}/>
              <Route path='/aboutme' render={()=><AboutMePage store={this.props}/>}/>
              <Route path='/portfolio' render={()=><PortfolioPage store={this.props}/>}/>
              <Route path='/chat' render={()=><ChatPage store={this.props}/>}/>
              <Route exact path='/mangareader' render={()=><MangaReader store={this.props}/>}/>
              <Route path='/mangareader/:manga/:volume/:page' render={(props)=><MangaRaderPage {...props} mangaData={this.props.data.mangaDb}/>}/>;

              <Route render={()=><HomePage store={this.props}/>}/>
          </Switch>
          <UnderConstructionNot/>
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
