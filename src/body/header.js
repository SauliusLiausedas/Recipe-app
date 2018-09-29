import React, {Component} from 'react'
import '../stylesheets/header.css'

class Header extends Component {
    render() {
        return(
          <div>
              <nav className="navbar">
                  <ul>
                      <li className="navList"><a href="/">Home</a></li>
                      <li className="navList"><a href="/all">All Recipes</a></li>
                      <li className="navList"><a>Edit Recipes</a></li>
                      <li className="navList"><a>Delete Recipes</a></li>
                      <li className="navList"><a>Search</a></li>
                  </ul>
              </nav>
          </div>  
        );
    }
}

export default Header;