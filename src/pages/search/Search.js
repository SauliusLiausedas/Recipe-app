import React, { Component } from 'react';
import '../../stylesheets/search.css';
import AllRecipes from "../all/allrecipes";
import fs from "../../firestoreservice"

class Search extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchReq: '',
            searchResult: '',
            noData: '',
            cssClass: ''
        };

    }

    onKeyTyped(e){
        //save input to a variable
        this.setState({searchReq : e.target.value});
    }

    onSubmit(){
        fs.getRecipesByName(this.state.searchReq).then(data=>{
            if(data) {
                this.setState({searchResult: data, cssClass: ' wide'});
            } else if(data === []) {
                this.setState({noData: 'Could not find things that you searched for :('})
            }
        })
    }

    renderRecipes() {
        return (
            <div className={'content' + this.state.cssClass}>
                <input className="searchInput" value={this.state.searchReq} type="text" onChange={(event) => this.onKeyTyped(event)}/><br/>
                <button className="recipeButton searchBtn" autoFocus onClick={() => this.onSubmit()}>Search</button>
                <div className="allRecipes">
                    <AllRecipes search={true} searchResult={this.state.searchResult} />
                </div>
            </div>
        )
    }

    render() {
        return this.renderRecipes()
    }
}

export default Search;