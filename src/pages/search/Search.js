import React, { Component } from 'react';
import '../../stylesheets/search.css';
import recipeDB from '../../data.js';

class Search extends Component {

    constructor(props){
        super(props);

        this.state = {searchReq : '',
            searchResult : {}};

        let tempObj= {};
        recipeDB.meal.forEach(meal => {
            tempObj[meal.id] = 0;
        });

        this.state.searchResult= tempObj;


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

        recipeDB.meal.forEach(meal => {
            let mealSearchIndex= 0;

            //search index gains
            const importantWord = 20;
            const simpleWord = 10;
            const subsequentWord = 2;

            //get all words into arrays to search through them
            var importantWords= [];
            var simpleWords= [];
            importantWords=meal.name.split(' ');
            meal.ingredients.forEach(ingredient => simpleWords=simpleWords.concat(ingredient.split(' ')) );
            simpleWords=simpleWords.concat(meal.method.split(' '));

            searchWords.forEach(searchWord => {
                var firstTime= true;
               for(let i= 0; i< importantWords.length; i++){
                   //lower case for case insensitivity
                   if(importantWords[i].toLowerCase() === searchWord.toLowerCase()) {
                       mealSearchIndex+= importantWord;
                       firstTime=false;
                       break;
                   }
               }


               simpleWords.forEach(word => {
                   if(searchWord.toLowerCase() === word.toLowerCase()){
                       if(firstTime) mealSearchIndex+= simpleWord;
                       else mealSearchIndex+= subsequentWord;
                       firstTime= false;
                   }
               });
            });
            searchIndexes[meal.id]=mealSearchIndex;
            //
             let temp= {...this.state.searchResult};
             temp[meal.id]= mealSearchIndex;
             this.setState({temp});
        });


        //can't figure out how to save/update object data in state
        //does not work either
        this.setState({searchResult : searchIndexes});

        console.log(searchIndexes)
        console.log(this.state.searchResult);
    }

    onSubmit(){
        this.computeSearchIndexes();

    }

    render() {
        return (
            <div className="content">
                <input value={this.state.searchReq} type="text" onChange={(event)=>this.onKeyTyped(event)} onSubmit={this.onSubmit}/>
                <button onClick={()=>this.onSubmit()}>Search</button>
            </div>
        )
    }
}

export default Search;