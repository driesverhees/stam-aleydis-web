import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  componentDidMount() {
    window.$(".button-collapse").sideNav({closeOnClick: true});
  }

  render() {
    return (
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">Logs</a>
            <a href="#!" data-activates="mobile-demo" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/activities">Activiteiten</NavLink></li>
              <li><NavLink to="/photos">Fotoalbum</NavLink></li>
              <li><NavLink to="/admin">Administratie</NavLink></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/activities">Activiteiten</NavLink></li>
              <li><NavLink to="/photos">Fotoalbum</NavLink></li>
              <li><NavLink to="/admin">Administratie</NavLink></li>
            </ul>
          </div>
        </nav>
    );
  }

}

export default Header;
