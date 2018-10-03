import React, { Component } from 'react';
import '../../stylesheets/search.css';
import recipeDB from '../../data.js';
import AllRecipes from "../all/allrecipes";

class Search extends Component {

    constructor(props){
        super(props);

        this.state = {searchReq : '',
            searchResult : []};

    }


    onKeyTyped(e){
        //save input to a variable
        this.setState({searchReq : e.target.value});
    }


    computeSearchIndexes(){
        let searchResults;
        if(this.state.searchReq) {
            searchResults = recipeDB.meal.filter((meal) => {
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
                <input value={this.state.searchReq} type="text" onChange={(event)=>this.onKeyTyped(event)} onSubmit={this.onSubmit}/>
                <button onClick={()=>this.onSubmit()}>Search</button>
                <AllRecipes searchResult={this.state.searchResult} />
            </div>
        )
    }
}

export default Search;