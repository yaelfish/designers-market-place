import React from 'react';
import { Router, Switch, Route} from 'react-router';
import { Link } from 'react-router-dom'
import history from './history';
import './assets/styles/global.scss';

import Home from './pages/Home';
import AppArtwork from './pages/Artwork/AppArtwork';
import AddArtwork from './pages/Artwork/AddArtwork';
import DetailsArtwork from './pages/Artwork/DetailsArtwork';
// import EditArtwork from './pages/Artwork/EditArtwork';
import MainNavbar from './cmps/MainNavbar';

import Login from './pages/Login';
import About from './pages/About';


function App() {
  return (
    <div className="App"> 
      <Router history={history}>
        <MainNavbar/>
        <Switch>
          <Route path="/about" component={About} exact/>
          <Route path="/login" component={Login} exact/>

          <Route component={Home} path="/" exact />
          <Route component={AppArtwork} path="/artwork" exact />
          <Route component={AddArtwork} path="/artwork/add" exact />
          <Route component={DetailsArtwork} path="/artwork/:_id" exact />
          {/* <Route component={EditArtwork} path="/artwork/:_id/edit" /> */}

          {/* <Route path="/" component={About} exact/> */}
          {/* <Route path="/" component={Home} exact/> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
