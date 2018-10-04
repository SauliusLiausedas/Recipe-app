import React, { Component } from 'react';
import '../../stylesheets/search.css';
import AllRecipes from "../all/allrecipes";

class Search extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchReq : '',
            searchResult : [],
        };

    }

    onKeyTyped(e){
        //save input to a variable
        this.setState({searchReq : e.target.value});
    }


    computeSearchIndexes(){
        let searchResults;
        if(this.state.searchReq) {
            searchResults = window.recipeDB.meal.filter((meal) => {
                return meal.name.toLowerCase().indexOf(this.state.searchReq.toLowerCase()) !== -1;
            });
        }else {
            searchResults = [];
        }

        this.setState({searchResult : searchResults});
    }

    onSubmit(){
        this.computeSearchIndexes();
    }

    render() {
        return (
            <div className="content">
                <input value={this.state.searchReq} type="text" onChange={(event) => this.onKeyTyped(event)}/>
                <button onClick={() => this.onSubmit()}>Search</button>
                <AllRecipes searchResult={this.state.searchResult} />
            </div>
        )
    }
}

export default Search;