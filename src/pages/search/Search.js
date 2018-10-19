import React, { Component } from 'react';
import '../../stylesheets/search.css';
import AllRecipes from "../all/allrecipes";
import fs from "../../firestoreservice"

class Search extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchReq : '',
            searchResult : '',
        };

    }

    onKeyTyped(e){
        //save input to a variable
        this.setState({searchReq : e.target.value});
    }

    onSubmit(){
        fs.getRecipesByName(this.state.searchReq).then(data=>{
            console.log(data)
            this.setState({searchResult: data});
        })
    }

    renderRecipes() {
        return (
            <div className="content">
                <input value={this.state.searchReq} type="text" onChange={(event) => this.onKeyTyped(event)}/>
                <button onClick={() => this.onSubmit()}>Search</button>
                <div className="allRecipes">
                    <AllRecipes searchResult={this.state.searchResult} />
                </div>
            </div>
        )
    }

    render() {
        return this.renderRecipes()
    }
}

export default Search;