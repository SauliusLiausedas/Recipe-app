import React, {Component} from 'react'
import '../stylesheets/header.css'

class Header extends Component {
    render() {
        return(
          <div>
              <nav className="navbar">
                  <ul>
                      <li className="navList"><a>Menu</a></li>
                      <li className="navList"><a>Recipies</a></li>
                      <li className="navList"><a>Edit recipies</a></li>
                      <li className="navList"><a>Delete Recipies</a></li>
                      <li><input placeholder="Search"></input></li>
                  </ul>
              </nav>
          </div>  
        );
    }
}

export default Header;