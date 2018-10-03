import React, { Component } from 'react';
import '../../stylesheets/search.css';
import recipeDB from '../../data.js';
import AllRecipes from "../all/allrecipes";

class Search extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchReq : '',
            searchResult : [],
        };

        /*let tempObj= {};
        recipeDB.meal.forEach(meal => {
            tempObj[meal.id] = 0;
        });

        this.state.searchResult= tempObj;*/


    }


    onKeyTyped(e){
        //save input to a variable
        this.setState({searchReq : e.target.value});
    }


    /*
     *  checks for every word in search input:
     *  if name of a meal contains the word, the meal gets 20 search index points
     *  if the word is contained anywhere else the meal gets 10 points
     *  for subsequent word matches the meal gets 2 points
     *
     *  all search index points are stored in searchResult object as values, along
     *  with meals ids as keys
     */
    computeSearchIndexes(){
        var searchWords= this.state.searchReq.split(' ');
        let searchIndexes= {};

        let searchResults = recipeDB.meal.filter((meal) => {
            return meal.name.toLowerCase().indexOf(this.state.searchReq.toLowerCase()) !== -1;
        });

        //can't figure out how to save/update object data in state
        //does not work either
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