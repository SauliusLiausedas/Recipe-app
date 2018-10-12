import React, { Component } from 'react';
import '../../stylesheets/search.css';
import AllRecipes from "../all/allrecipes";
import {getAllRecipes, searchByName} from "../../api/getRecipesApi"

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

    onSubmit(){
        searchByName(this.state.searchReq).then(data=>{
            this.setState({searchResult: data.meals});
        })
    }

    renderRecipes() {
        return (
            <div className="content">
                <input value={this.state.searchReq} type="text" onChange={(event) => this.onKeyTyped(event)}/>
                <button onClick={() => this.onSubmit()}>Search</button>
                <AllRecipes searchResult={this.state.searchResult} />
            </div>
        )
    }

    render() {
        return this.renderRecipes()
    }
}

export default Search;