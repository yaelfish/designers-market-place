import React, { Component } from 'react';
import { Router, Switch, Route} from 'react-router';
import { connect } from 'react-redux';
import { login } from './actions/UserActions';
import ScrollToTop from './cmps/ScrollToTop'
import '@progress/kendo-theme-material/dist/all.css';
import './assets/styles/global.scss';
import history from './history';
import Home from './pages/Home';
import AppArtwork from './pages/Artwork/AppArtwork';
import AddArtwork from './pages/Artwork/AddArtwork';
import SimulateArtwork from './pages/Artwork/SimulateArtwork';
import DetailsArtwork from './pages/Artwork/DetailsArtwork';
import ArtistApp from './pages/Artist/ArtistApp'
import MainNavbar from './cmps/MainNavbar'
import EditArtwork from './pages/Artwork/EditArtwork';
import Footer from './cmps/Footer'
import Login from './pages/Login';
import About from './pages/About';
import ArtworkOnWall from './pages/Artwork/ArtworkOnWall';

class App extends Component {

  componentDidMount() {
    // this.props.login({ email: "idan2030@gmail.com", password: 'AwesomePortown' });
    this.props.login({ email: "kerryjm2020@gmail.com", password: 1234567890 });
  }



  render(){
    return (
      <div className="App">
        <Router history={history}  >
        <ScrollToTop />
          <MainNavbar history={history} loggedInUser={this.props.loggedInUser}></MainNavbar>
          <Switch>
            <Route component={About} path="/about" exact />
            <Route component={Login} path="/login" exact />
            <Route component={Home} path="/" exact />
            <Route component={AppArtwork} path="/artwork" exact />
            <Route component={AddArtwork} path="/artwork/add" exact />
            <Route component={EditArtwork} path="/artwork/edit/:_id/" exact />
            <Route component={SimulateArtwork} path="/artwork/simulate/:_id/" exact />
            <Route component={ArtworkOnWall} path="/artwork/wall/:_id/" exact />
            <Route component={DetailsArtwork} path="/artwork/:_id" exact />
            <Route component={ArtistApp} path="/artist" exact />

          </Switch>
          <Footer/>
        </Router>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    loggedInUser: state.user.loggedInUser
  };
};
const mapDispatchToProps = {
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
