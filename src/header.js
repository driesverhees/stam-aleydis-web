import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  componentDidMount() {
    window.$(".button-collapse").sideNav({closeOnClick: true});
  }

  render() {
    return (
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">Logs</a>
            <a href="#" data-activates="mobile-demo" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/activities">Activiteiten</Link></li>
              <li><Link to="/photos">Fotoalbum</Link></li>
              <li><Link to="/admin">Administratie</Link></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/activities">Activiteiten</Link></li>
              <li><Link to="/photos">Fotoalbum</Link></li>
              <li><Link to="/admin">Administratie</Link></li>
            </ul>
          </div>
        </nav>
    );
  }

}

export default Header;
