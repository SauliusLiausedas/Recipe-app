import React, { Component } from "react";
import '../../stylesheets/searchBar.css'

class SearchBar extends Component {
    render() {
        return(
            <div className="search">
                <input type="text" placeholder="Enter your search" onKeyUp={(e) => this.props.onTextChange(e.target.value)}  className="searchBar" />
            </div>
        )
    }
}

export default SearchBar