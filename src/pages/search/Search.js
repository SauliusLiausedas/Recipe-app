import React, { Component } from 'react';
import '../../stylesheets/search.css';
import AllRecipes from "../all/allrecipes";
import {getAllRecipes} from "../../services/getRecipesService"

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
        getAllRecipes().then(recipes => {
            let searchResults;
            if(this.state.searchReq) {

                searchResults = recipes.meal.filter((meal) => {
                    return meal.name.toLowerCase().indexOf(this.state.searchReq.toLowerCase()) !== -1;
                });
            }else {
                searchResults = [];
            }
            console.log(this.setState);
            this.setState({searchResult : searchResults});
        });
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