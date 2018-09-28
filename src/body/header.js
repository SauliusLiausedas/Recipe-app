import React, {Component} from 'react'
import '../stylesheets/header.css'

class Header extends Component {
    render() {
        return(
          <div>
              <nav className="navbar">
                  <ul>
                      <li><a>Menu</a></li>
                      <li><a>Recipies</a></li>
                      <li><a>Edit recipies</a></li>
                      <li><a>Delete Recipies</a></li>
                      <li><a>Comments</a></li>
                  </ul>
              </nav>
          </div>  
        );
    }
}

export default Header;