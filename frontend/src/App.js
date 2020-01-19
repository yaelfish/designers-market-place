import React from 'react';
import { Router, Switch, Route} from 'react-router';
import history from './history';
import './assets/styles/global.scss';

import Home from './pages/Home';
import AppArtwork from './pages/Artwork/AppArtwork';
import AddArtwork from './pages/Artwork/AddArtwork';
import DetailsArtwork from './pages/Artwork/DetailsArtwork';
import ArtistApp from './pages/Artist/ArtistApp'

import MainNavbar from './cmps/MainNavbar'

// import EditArtwork from './pages/Artwork/EditArtwork';

import EditArtwork from './pages/Artwork/EditArtwork';


import Login from './pages/Login';
import About from './pages/About';


function App() {
  return (
    <div className="App"> 
      <Router history={history}>
      <MainNavbar history={history}></MainNavbar>
        <Switch>
          <Route path="/about" component={About} exact/>
          <Route path="/login" component={Login} exact/>

          <Route component={Home} path="/" exact />
          <Route component={AppArtwork} path="/artwork" exact />
          <Route component={AddArtwork} path="/artwork/add" exact />
          <Route component={EditArtwork} path="/artwork/edit/:_id/" exact/>
          <Route component={DetailsArtwork} path="/artwork/:_id" exact />
          <Route component={ArtistApp} path="/artist" exact />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
