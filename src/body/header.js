import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import '../stylesheets/header.css'
import logo from '../img/logo.png';

class Header extends Component {
    render() {
        return(
          <div className="headerAll">
              <header className="header">
                <img src={logo} className="logo" alt="logo"/>
                <h1 className="title">Hell's Kitchen Recipes</h1>
              </header>
              <nav className="navbar">
                  <ul className="navList">
                      <li className="navListItem"><Link to="/" className="navListItemLink">Home</Link></li>
                      <li className="navListItem"><Link to="/all/1" className="navListItemLink">All Recipes</Link></li>
                      <li className="navListItem"><Link to="/search" className="navListItemLink">Search</Link></li>
                      <li className="navListItem"><Link to="/categories" className="navListItemLink">Categories</Link></li>
                      {/*<li className="navListItem"><Link to="/addtofirebase" className="navListItemLink">Add to firebase</Link></li>*/}
                      <li className="navListItem"><Link to="/add" className="navListItemLink">Add recipe</Link></li>
                  </ul>
              </nav>
          </div>  
        );
    }
}

export default Header;