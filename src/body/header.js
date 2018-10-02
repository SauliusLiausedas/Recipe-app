import React, {Component} from 'react'
import '../stylesheets/header.css'
import logo from '../img/logo.png';

class Header extends Component {
    render() {
        return(
          <div>
              <header className="header">
                <img src={logo} className="logo" alt="logo"/>
                <h1 className="title">Hell's Kitchen Recipes</h1>
              </header>
              <nav className="navbar">
                  <ul className="navList">
                      <li className="navListItem"><a className="navListItemLink" href="/home">Home</a></li>
                      <li className="navListItem"><a className="navListItemLink" href="/all">All Recipes</a></li>
                      <li className="navListItem"><a className="navListItemLink">Edit Recipes</a></li>
                      <li className="navListItem"><a className="navListItemLink">Delete Recipes</a></li>
                      <li className="navListItem"><a className="navListItemLink" href="/search">Search</a></li>
                  </ul>
              </nav>
          </div>  
        );
    }
}

export default Header;